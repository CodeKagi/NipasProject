import React from "react";
import { Outlet } from "react-router-dom";
import TopNav from "../components/TopNav";
import Sidebar from "../components/Sidebar";
import type { MenuItemShape } from "../components/Sidebar";

export default function Dashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [fetchedMenu, setFetchedMenu] = React.useState<MenuItemShape[] | undefined>(undefined);
  const [loadingMenu, setLoadingMenu] = React.useState(false);

  const currentUser = React.useMemo(() => {

    const injected = (window as any).__USER__;
    if (injected && Array.isArray(injected.roles)) {
      return injected;
    }

    return {
      name: "John Doe",
      roles: ["CENTRAL_OFFICER"],
    };
  }, []);

  React.useEffect(() => {
    let cancelled = false;

    async function loadMenu() {
      setLoadingMenu(true);
      try {
        const res = await fetch("/api/menu");
        if (!res.ok) throw new Error("No /api/menu");
        const json = await res.json();
        if (!cancelled && Array.isArray(json)) {
          setFetchedMenu(json as MenuItemShape[]);
        }
      } catch (err) {

      } finally {
        if (!cancelled) setLoadingMenu(false);
      }
    }

    loadMenu();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <TopNav />

      <div className="flex flex-1 relative">
        <Sidebar
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
          isPreview={false}
          userRoles={currentUser.roles}
          menuItems={fetchedMenu}
        />

        <div
          className="flex-1 overflow-y-auto p-6 transition-all duration-300"
          style={{ marginLeft: sidebarCollapsed ? "114px" : "334px" }}
        >

          <Outlet />
        </div>
      </div>
    </div>
  );
}
