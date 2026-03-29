import { app, BrowserWindow, ipcMain, screen } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { DEV_SERVER_URL } from "../config/dev.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isDev = !app.isPackaged;
const preloadEntryPath = path.join(__dirname, "../preload/preload.js");
const rendererEntryPath = path.join(__dirname, "../renderer/index.html");
const DEFAULT_RESTORED_WIDTH = 1280;
const DEFAULT_RESTORED_HEIGHT = 820;
const FULLSCREEN_LIKE_RATIO = 0.92;
const windowRestoreBounds = new WeakMap<BrowserWindow, Electron.Rectangle>();

const waitForWindowEvent = <T>(
  window: BrowserWindow,
  eventName: "minimize" | "maximize" | "unmaximize",
  getValue: () => T
) =>
  new Promise<T>((resolve) => {
    const finalize = () => {
      clearTimeout(timeoutId);
      resolve(getValue());
    };
    const timeoutId = setTimeout(finalize, 150);
    (window as Electron.BrowserWindow & {
      once: (event: string, listener: () => void) => Electron.BrowserWindow;
    }).once(eventName, finalize);
  });

const getDisplayWorkArea = (window: BrowserWindow) => {
  return screen.getDisplayMatching(window.getBounds()).workArea;
};

const clampToDisplay = (
  window: BrowserWindow,
  targetWidth: number,
  targetHeight: number,
  workArea: Electron.Rectangle
) => {
  const [minWidth, minHeight] = window.getMinimumSize();
  const widthFloor = Math.min(minWidth, workArea.width);
  const heightFloor = Math.min(minHeight, workArea.height);

  return {
    width: Math.max(widthFloor, Math.min(targetWidth, workArea.width)),
    height: Math.max(heightFloor, Math.min(targetHeight, workArea.height))
  };
};

const isReasonableRestoredBounds = (bounds: Electron.Rectangle, workArea: Electron.Rectangle) => {
  if (bounds.width <= 0 || bounds.height <= 0) {
    return false;
  }

  const withinWorkArea =
    bounds.x >= workArea.x &&
    bounds.y >= workArea.y &&
    bounds.x + bounds.width <= workArea.x + workArea.width &&
    bounds.y + bounds.height <= workArea.y + workArea.height;

  if (!withinWorkArea) {
    return false;
  }

  const widthRatio = bounds.width / workArea.width;
  const heightRatio = bounds.height / workArea.height;
  return widthRatio < FULLSCREEN_LIKE_RATIO || heightRatio < FULLSCREEN_LIKE_RATIO;
};

const getCenteredRestoredBounds = (window: BrowserWindow) => {
  const workArea = getDisplayWorkArea(window);
  const savedBounds = windowRestoreBounds.get(window);
  const size = savedBounds && isReasonableRestoredBounds(savedBounds, workArea)
    ? clampToDisplay(window, savedBounds.width, savedBounds.height, workArea)
    : clampToDisplay(window, DEFAULT_RESTORED_WIDTH, DEFAULT_RESTORED_HEIGHT, workArea);

  return {
    width: size.width,
    height: size.height,
    x: Math.round(workArea.x + (workArea.width - size.width) / 2),
    y: Math.round(workArea.y + (workArea.height - size.height) / 2)
  };
};

const rememberNormalBounds = (window: BrowserWindow) => {
  if (window.isDestroyed() || window.isMinimized() || window.isMaximized() || window.isFullScreen()) {
    return;
  }
  windowRestoreBounds.set(window, window.getBounds());
};

if (isDev && process.platform === "linux") {
  app.commandLine.appendSwitch("disable-gpu");
  app.disableHardwareAcceleration();
}

const createWindow = async () => {
  const window = new BrowserWindow({
    width: DEFAULT_RESTORED_WIDTH,
    height: DEFAULT_RESTORED_HEIGHT,
    minWidth: 1280,
    minHeight: 820,
    center: true,
    backgroundColor: "#081018",
    frame: false,
    autoHideMenuBar: true,
    hasShadow: false,
    show: false,
    webPreferences: {
      preload: preloadEntryPath,
      sandbox: false,
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  window.once("ready-to-show", () => window.show());
  rememberNormalBounds(window);
  window.on("resize", () => rememberNormalBounds(window));
  window.on("move", () => rememberNormalBounds(window));
  window.on("unmaximize", () => rememberNormalBounds(window));

  const rendererSource = isDev ? DEV_SERVER_URL : rendererEntryPath;
  window.webContents.once("did-finish-load", () => {
    console.info(`[${isDev ? "dev" : "prod"}] Renderer loaded ${rendererSource}`);
  });

  window.webContents.once("did-fail-load", (_event, errorCode, errorDescription, validatedURL) => {
    console.error(`[${isDev ? "dev" : "prod"}] Renderer failed to load ${validatedURL}`, {
      errorCode,
      errorDescription
    });
  });

  if (isDev) {
    await window.loadURL(rendererSource);
    return;
  }

  await window.loadFile(rendererSource);
};

ipcMain.handle("window:minimize", (event) => {
  const window = BrowserWindow.fromWebContents(event.sender);
  if (!window) {
    return false;
  }
  if (window.isMinimized()) {
    return true;
  }
  const minimized = waitForWindowEvent(window, "minimize", () => window.isMinimized());
  window.minimize();
  return minimized;
});

ipcMain.handle("window:toggle-maximize", async (event) => {
  const window = BrowserWindow.fromWebContents(event.sender);
  if (!window) {
    return false;
  }
  if (window.isMaximized()) {
    const restoredBounds = getCenteredRestoredBounds(window);
    const restored = waitForWindowEvent(window, "unmaximize", () => window.isMaximized());
    window.unmaximize();
    const restoredState = await restored;
    window.setBounds(restoredBounds);
    return restoredState;
  }
  const maximized = waitForWindowEvent(window, "maximize", () => window.isMaximized());
  window.maximize();
  return maximized;
});

ipcMain.handle("window:close", (event) => {
  BrowserWindow.fromWebContents(event.sender)?.close();
});

ipcMain.handle("window:is-maximized", (event) => {
  return BrowserWindow.fromWebContents(event.sender)?.isMaximized() ?? false;
});

app.whenReady().then(() => {
  createWindow().catch((error) => {
    console.error("Failed to create window", error);
    app.quit();
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      void createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
