import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { TextInput } from "@/components/ui";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";

const navigation = [
  { label: "Dashboard", to: "/" },
  { label: "Wallets", to: "/wallets" },
  { label: "Groups", to: "/groups" },
  { label: "Alerts", to: "/alerts" },
  { label: "Calendar", to: "/calendar" },
  { label: "Search", to: "/search" },
  { label: "Import", to: "/import" },
  { label: "Assistant", to: "/assistant" }
];

export const AppLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [globalSearch, setGlobalSearch] = useState("");
  const [isMaximized, setIsMaximized] = useState(false);
  const debouncedSearch = useDebouncedValue(globalSearch, 180);

  const title = useMemo(() => {
    const entry = navigation.find((item) =>
      item.to === "/" ? location.pathname === "/" : location.pathname.startsWith(item.to)
    );
    return entry?.label ?? "Wallet Loader";
  }, [location.pathname]);

  useEffect(() => {
    const syncWindowState = async () => {
      const api = window.walletLoaderDesktop;
      if (!api?.isWindowMaximized) {
        return;
      }
      setIsMaximized(await api.isWindowMaximized());
    };

    void syncWindowState();
    window.addEventListener("resize", syncWindowState);

    return () => {
      window.removeEventListener("resize", syncWindowState);
    };
  }, []);

  return (
    <div className="window-shell">
      <header className="window-titlebar">
        <div className="window-drag-region" />
        <div className="window-controls">
          <button
            className="window-control"
            type="button"
            aria-label="Minimize window"
            onClick={() => void window.walletLoaderDesktop?.minimizeWindow()}
          >
            <span className="window-control-icon minimize" aria-hidden="true" />
          </button>
          <button
            className="window-control"
            type="button"
            aria-label={isMaximized ? "Restore window" : "Maximize window"}
            onClick={async () => {
              const api = window.walletLoaderDesktop;
              if (!api?.toggleMaximizeWindow) {
                return;
              }
              setIsMaximized(await api.toggleMaximizeWindow());
            }}
          >
            <span className={`window-control-icon ${isMaximized ? "restore" : "maximize"}`} aria-hidden="true" />
          </button>
          <button
            className="window-control window-control-close"
            type="button"
            aria-label="Close window"
            onClick={() => void window.walletLoaderDesktop?.closeWindow()}
          >
            <span className="window-control-icon close" aria-hidden="true" />
          </button>
        </div>
      </header>

      <div className="app-shell">
        <aside className="sidebar">
          <div className="brand-block">
            <div className="brand-mark">WL</div>
            <div>
              <strong>Wallet Loader</strong>
            </div>
          </div>

          <nav className="nav-list">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                className={({ isActive }) => `nav-item${isActive ? " active" : ""}`}
                to={item.to}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="main-panel">
          <header className="topbar">
            <div>
              <p className="eyebrow">Recorded demo mode</p>
              <h1>{title}</h1>
            </div>
            <div className="topbar-actions">
              <div className="search-inline">
                <TextInput
                  value={globalSearch}
                  onChange={setGlobalSearch}
                  placeholder="Jump to wallet, group, alert..."
                />
              </div>
              <button
                className="primary-button"
                onClick={() => navigate(`/search?q=${encodeURIComponent(debouncedSearch || globalSearch)}`)}
              >
                Search
              </button>
            </div>
          </header>

          <div className="app-content">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
