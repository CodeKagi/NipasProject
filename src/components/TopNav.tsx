import React, { useState, useMemo } from "react";
import { Menu, Dropdown, Avatar, Drawer, Button } from "antd";
import { UserOutlined, MenuOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

export default function TopNav() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();


  const currentUser = useMemo(() => {
    const injected = (window as any).__USER__;
    if (injected && Array.isArray(injected.roles)) return injected;
    // fallback dev user
    return { name: "Kagiso", roles: ["CENTRAL_OFFICER"] };
  }, []);

  const roles: string[] = currentUser.roles ?? [];

  // -------------------------
  // Menu definitions
  // -------------------------
  const defaultItems = [
    { key: "new-applications", label: "New Applications", path: "/dashboard/new-applications" },
    { key: "applications", label: "Applications", path: "/dashboard/applications" },
    { key: "proxies", label: "Proxies", path: "/dashboard/proxies" },
    { key: "transactions", label: "Transactions", path: "/dashboard/transactions" },
    { key: "specie-info", label: "Specie Info", path: "/dashboard/specie-info" },
  ];

  // Items specifically for central officer (plus My Tasks & Support)
const centralOfficerExtra = [
  { key: "new-applications", label: "New Applications", path: "/dashboard/new-applications" },

  // 👉 Insert My Tasks right after New Applications
  { key: "my-tasks", label: "My Tasks", path: "/dashboard/my-tasks" },

  // Then the rest
  { key: "applications", label: "Applications", path: "/dashboard/applications" },
  { key: "proxies", label: "Proxies", path: "/dashboard/proxies" },
  { key: "transactions", label: "Transactions", path: "/dashboard/transactions" },
  { key: "specie-info", label: "Specie Info", path: "/dashboard/specie-info" },

  // Support always last
  { key: "support", label: "Support", path: "/dashboard/support" },
];


  // Build the items array depending on role
  const items = useMemo(() => {
    if (roles.includes("CENTRAL_OFFICER")) return centralOfficerExtra;

    // hide new-applications for admin (same as your previous logic)
    return defaultItems.filter((item) => !(roles.includes("ADMIN") && item.key === "new-applications"));
  }, [roles]);

  // Determine selected key by matching current path to item.path
  const selectedKey = useMemo(() => {
    const match = items.find((it) => it.path === location.pathname);
    return match ? match.key : undefined;
  }, [items, location.pathname]);

  // Ant Menu items shape
  const antMenuItems = items.map((it) => ({ key: it.key, label: it.label }));

  // Profile dropdown items
  const profileMenu = {
    items: [
      { key: "profile", label: <span className="text-xs font-sans">Profile</span> },
      { key: "settings", label: <span className="text-xs font-sans">Settings</span> },
      { key: "logout", label: <span className="text-xs font-sans">Logout</span> },
    ],
    onClick: ({ key }: { key: string }) => {
      if (key === "logout") {
        // handle logout - replace with your logic
        window.location.href = "/";
      } else if (key === "profile") {
        navigate("/dashboard/user-profile");
      } else if (key === "settings") {
        // replace with settings route if you have one
        navigate("/dashboard/user-profile");
      }
    },
  };

  return (
    <nav className="sticky top-0 w-full bg-[#3F842E] text-white shadow-md z-50 transition-all duration-300">
      <div className="flex items-center justify-between px-4 md:px-8 h-16">
        {/* Centered menu on desktop */}
        <div className="hidden md:flex flex-1 justify-center">
          <Menu
            mode="horizontal"
            selectedKeys={selectedKey ? [selectedKey] : []}
            onClick={(e) => {
              const item = items.find((i) => i.key === e.key);
              if (item) navigate(item.path);
            }}
            items={antMenuItems}
            className="bg-transparent flex-1 justify-center border-none
              [&>.ant-menu-item]:!text-white
              [&>.ant-menu-item]:!font-bold
              [&>.ant-menu-item:hover]:!text-gray-300
              [&>.ant-menu-item::after]:!hidden
              [&>.ant-menu-item-selected::after]:!hidden
              transition-all duration-300"
          />
        </div>

        {/* Right-side profile / avatar */}
        <div className="hidden md:flex items-center space-x-2">
          <Dropdown menu={profileMenu} placement="bottomLeft" trigger={["click"]}>
            <div className="flex items-center space-x-2 cursor-pointer">
              <span className="text-sm font-semibold text-white">Hello, {currentUser.name ?? "User"}</span>
              <Avatar size="large" icon={<UserOutlined />} />
            </div>
          </Dropdown>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden ml-auto">
          <Button
            type="text"
            icon={<MenuOutlined className="text-white text-2xl" />}
            onClick={() => setDrawerOpen(true)}
          />
        </div>

        {/* Mobile drawer */}
        <Drawer
          placement="right"
          onClose={() => setDrawerOpen(false)}
          open={drawerOpen}
          bodyStyle={{ padding: 0, backgroundColor: "#3F842E" }}
        >
          <div className="flex flex-col p-4 space-y-4">
            {items.map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  navigate(item.path);
                  setDrawerOpen(false);
                }}
                className="text-white font-bold text-xs text-left"
              >
                {item.label}
              </button>
            ))}

            <div className="border-t border-white/50 my-2"></div>

            <Dropdown menu={profileMenu} placement="bottomLeft" trigger={["click"]}>
              <div className="flex items-center space-x-2 cursor-pointer">
                <span className="text-sm font-semibold text-white">Hello, {currentUser.name ?? "User"}</span>
                <Avatar size="small" icon={<UserOutlined />} />
              </div>
            </Dropdown>
          </div>
        </Drawer>
      </div>
    </nav>
  );
}
