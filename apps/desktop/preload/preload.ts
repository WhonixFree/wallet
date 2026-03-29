import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("walletLoaderDesktop", {
  platform: "electron-demo",
  minimizeWindow: async () => ipcRenderer.invoke("window:minimize"),
  toggleMaximizeWindow: async () => ipcRenderer.invoke("window:toggle-maximize"),
  closeWindow: async () => ipcRenderer.invoke("window:close"),
  isWindowMaximized: async () => ipcRenderer.invoke("window:is-maximized")
});
