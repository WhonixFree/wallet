/// <reference types="vite/client" />

declare global {
  interface Window {
    walletLoaderDesktop?: {
      platform: string;
      minimizeWindow: () => Promise<boolean>;
      toggleMaximizeWindow: () => Promise<boolean>;
      closeWindow: () => Promise<void>;
      isWindowMaximized: () => Promise<boolean>;
    };
  }
}

export {};
