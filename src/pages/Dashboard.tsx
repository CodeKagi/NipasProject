import React from "react";
import { Outlet } from "react-router-dom";
import TopNav from "../components/TopNav";
import Sidebar from "../components/Sidebar";
import type { MenuItemShape } from "../components/Sidebar";


// Optional: If you have an AuthContext in your app, import and use it instead of the fallback below.
// import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [fetchedMenu, setFetchedMenu] = React.useState<MenuItemShape[] | undefined>(undefined);
  const [loadingMenu, setLoadingMenu] = React.useState(false);

  // ---------------------------
  // Resolve current user roles
  // ---------------------------
  // Prefer your existing auth system if available. This example checks commonly-used fallbacks:
  const currentUser = React.useMemo(() => {
    // 1) If you have an AuthContext hook, use it here (uncomment above and replace)
    // const auth = useAuth();
    // if (auth?.user) return auth.user;

    // 2) If server-side injected the user into the page (common pattern)
    const injected = (window as any).__USER__;
    if (injected && Array.isArray(injected.roles)) {
      return injected;
    }

    // 3) Fallback dummy user so the UI still renders during development
    return {
      name: "John Doe",
      roles: ["CENTRAL_OFFICER"], // change to test CENTRAL_OFFICER or ADMIN
    };
  }, []);

  // ---------------------------
  // Fetch menu from backend (optional)
  // ---------------------------
  React.useEffect(() => {
    let cancelled = false;

    async function loadMenu() {
      setLoadingMenu(true);
      try {
        const res = await fetch("/api/menu");
        if (!res.ok) throw new Error("No /api/menu");
        const json = await res.json();
        // Basic validation: expect array of menu items
        if (!cancelled && Array.isArray(json)) {
          setFetchedMenu(json as MenuItemShape[]);
        }
      } catch (err) {
        // console.warn("Menu fetch failed, falling back to defaults", err);
        // leave fetchedMenu undefined so Sidebar will use its internal default
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
        {/* Sidebar: pass userRoles and optional fetched menu */}
        <Sidebar
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
          isPreview={false}
          userRoles={currentUser.roles}
          menuItems={fetchedMenu}
        />

        {/* Main content area - we keep the same transition and margin logic */}
        <div
          className="flex-1 overflow-y-auto p-6 transition-all duration-300"
          style={{ marginLeft: sidebarCollapsed ? "114px" : "334px" }}
        >
          {/* Optional: show a small loader while menu is being fetched (not required) */}
          {/** If you want a top-level loader while menu loads, toggle it with `loadingMenu`. **/}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
