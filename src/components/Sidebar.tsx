import React from "react";
import { Avatar, Menu } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

import forgotPasswordLogo from "../assets/forgotPasswordLogo.svg";
import collapsedSideNavLogo from "../assets/collapsedSideNavLogo.svg";
import dashBoardIcon from "../assets/dashBoardicon.svg";
import biodiversityProjectsIcon from "../assets/biodiversityProjectsIcon.svg";
import stakeholderIcon from "../assets/stakeholderIcon.svg";
import userProfileIcon from "../assets/userProfileIcon.svg";
import logoutIcon from "../assets/logoutIcon.svg";
import profileIcon from "../assets/femaleUserProfile.svg";

// --- Types ------------------------------------------------------------------
export type MenuItemShape = {
  key: string;                 // route or unique key (e.g. "/dashboard", "pending")
  label: string;               // text to display
  icon?: string | React.ReactNode; // can be image path (string) or a ReactNode
  allowedRoles?: string[];     // roles that can see this menu item (if omitted => visible to all)
};

// --- Props ------------------------------------------------------------------
interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
  isPreview?: boolean;
  // optional: roles for the current user (e.g. ["CENTRAL_OFFICER","PROCESSOR"])
  userRoles?: string[];
  // optional: menu items can be injected by backend (if not provided we fall back to the local items)
  menuItems?: MenuItemShape[];
}

const DEFAULT_MENU: MenuItemShape[] = [
  { key: "/dashboard", icon: dashBoardIcon, label: "Dashboard", allowedRoles: ["ADMIN","PROCESSOR"] },
  { key: "/dashboard/user-profile", icon: userProfileIcon, label: "User Profile", allowedRoles: ["ADMIN","PROCESSOR"] },
  { key: "/dashboard/biodiversity-projects", icon: biodiversityProjectsIcon, label: "Biodiversity Projects", allowedRoles: ["ADMIN","PROCESSOR"] },
  { key: "/dashboard/stakeholder", icon: stakeholderIcon, label: "Stakeholder", allowedRoles: ["ADMIN"] },
];

// Example of additional role-specific right-side menu items (this can come from the backend)
const CENTRAL_OFFICER_MENU: MenuItemShape[] = [
  { key: "/dashboard/pending", icon: "pending", label: "Pending", allowedRoles: ["CENTRAL_OFFICER"] },
  { key: "/dashboard/completed", icon: "completed", label: "Completed", allowedRoles: ["CENTRAL_OFFICER"] },
  { key: "/dashboard/deferred", icon: "deferred", label: "Deferred", allowedRoles: ["CENTRAL_OFFICER"] },
  { key: "/dashboard/pending-info", icon: "pending-info", label: "Pending Information", allowedRoles: ["CENTRAL_OFFICER"] },
];

// --- Helper: render icon (string path or ReactNode) ---------------------------
function renderIcon(icon?: string | React.ReactNode, collapsed = false) {
  // If icon is a string that looks like a path, render an <img/>
  if (!icon) return null;
  if (typeof icon === "string") {
    // small convenience for some named icons (you used images in your design)
    // If backend sends simple token names like "pending" or "completed", we can map to emoji or ant icons here.
    const name = icon.toLowerCase();
    if (name === "pending") return <span className="text-xl">⏳</span>;
    if (name === "completed") return <span className="text-xl">✔️</span>;
    if (name === "deferred") return <span className="text-xl">📌</span>;
    if (name === "pending-info") return <span className="text-xl">🛈</span>;

    // otherwise treat as image path
    return <img src={icon} alt="icon" className="w-6 h-6" />;
  }

  // Already a React node (e.g. <SomeIcon/>)
  return icon;
}

// --- Component ----------------------------------------------------------------
export default function Sidebar({
  collapsed,
  setCollapsed,
  isPreview = false,
  userRoles = [], // optional: can be passed from parent / auth provider
  menuItems,
}: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  // Merge menu items: priority to injected menuItems, else DEFAULT_MENU + role extras
  const mergedMenu: MenuItemShape[] = React.useMemo(() => {
    if (menuItems && menuItems.length > 0) return menuItems;
    // If no injected menu, combine default + central officer example (you can remove CENTRAL_OFFICER_MENU if not needed)
    return [...DEFAULT_MENU, ...CENTRAL_OFFICER_MENU];
  }, [menuItems]);

  // Filter by roles (allowedRoles missing => public)
  const allowedMenu = mergedMenu.filter((it) => {
    if (!it.allowedRoles || it.allowedRoles.length === 0) return true;
    // if userRoles is empty, no role means treat as not allowed (you can change to public by default)
    return it.allowedRoles.some((r) => userRoles.includes(r));
  });

  // Build Ant Menu items using the icon rendering helper
  const antItems = allowedMenu.map((item) => ({
    key: item.key,
    icon: React.cloneElement(
      // cloneElement expects a React node, so we ensure renderIcon returns one
      React.isValidElement(renderIcon(item.icon, collapsed)) ? renderIcon(item.icon, collapsed) as React.ReactElement : <span>{renderIcon(item.icon, collapsed)}</span>,
      {
        style: {
          fontSize: collapsed ? 30 : 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: collapsed ? 40 : 24,
          transition: "all 0.3s ease",
        },
      }
    ),
    label: item.label,
  }));

  // bottom items remain the same; can also accept injection if needed
  const bottomItems = [
    { key: "support", label: "Support" },
    { key: "notifications", label: "Notifications" },
    { key: "messages", label: "Messages" },
  ];

  return (
    <aside
      className={`bg-white border-[5px] border-[#3F842E] rounded-[50px] shadow-lg flex flex-col transition-all duration-300`}
      style={{
        width: collapsed ? "80px" : "300px",
        height: "calc(100vh - 98px)",
        padding: collapsed ? "0px" : "24px",
        justifyContent: collapsed ? "center" : "flex-start",
        flexDirection: "column",
        position: isPreview ? "relative" : "fixed",
        top: isPreview ? "auto" : "24px",
        left: isPreview ? "auto" : "34px",
        zIndex: isPreview ? "auto" : 999,
      }}
    >
      <div className="flex flex-col mb-16">
        <div
          className="flex justify-center transition-all duration-300"
          style={{ marginTop: collapsed ? "40px" : "4px", marginBottom: "40px" }}
        >
          <img
            src={collapsed ? collapsedSideNavLogo : forgotPasswordLogo}
            alt="Logo"
            className={`transition-all duration-300 ${collapsed ? "h-10 w-[5rem]" : "h-16"}`}
          />
        </div>

        <div className="flex-1 overflow-hidden">
          <Menu
            mode="inline"
            inlineCollapsed={collapsed}
            items={antItems}
            style={{ borderInlineEnd: "none", height: "100%", transition: "all 0.3s ease" }}
            className={`bg-transparent 
    [&>.ant-menu-item]:!text-[#3F842E] 
    [&>.ant-menu-item]:!font-bold 
    [&>.ant-menu-item]:flex 
    [&>.ant-menu-item]:items-center 
    [&>.ant-menu-item]:justify-start 
    [&>.ant-menu-item:hover]:!underline
    [&>.ant-menu-item-icon]:!min-w-[50px]
     [&>.ant-menu-item-selected]:!bg-[rgba(63,132,46,0.7)] 
  [&>.ant-menu-item-selected]:!text-white
    ${collapsed ? " [&>.ant-menu-item]:!p-[11px] [&>.ant-menu-item-icon]:text-2xl" : ""}`}
            defaultSelectedKeys={["/dashboard"]}
            selectedKeys={[location.pathname === "/dashboard" ? "/dashboard" : location.pathname]}
            onClick={(info) => {
              // If the item key looks like an external anchor, you can handle it here.
              navigate(info.key as string);
            }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-10">
        <div className="flex flex-col gap-2">
          {bottomItems.map((item) => (
            <button
              key={item.key}
              className={`flex items-center text-md gap-3 pl-9 pt-2.5 pb-2.5  rounded-md hover:bg-gray-100 transition-all duration-200  text-sm`}
            >
              {!collapsed && <span>{item.label}</span>}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-2 border-t pt-4">
          <button
            className={`flex items-center gap-3 pt-2.5 pb-2.5 rounded-md hover:bg-gray-100 transition-all duration-200 items-center text-sm 
    ${collapsed ? "pl-6" : "pl-9"}`}
          >
            <img src={profileIcon} alt="Profile" className="w-6 h-6" />
            {!collapsed && <strong className="font-bold pt-[5px]">John Doe</strong>}
          </button>

          <button
            className={`flex items-center gap-3 pt-2.5 pb-2.5 rounded-md hover:bg-gray-100 transition-all duration-200 items-center text-sm 
    ${collapsed ? "pl-6" : "pl-9"}`}
          >
            <img src={logoutIcon} alt="Logout" className="w-6 h-6" />
            {!collapsed && <span className="pt-[5px]">Logout</span>}
          </button>
        </div>
      </div>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="bg-[#3F842E] text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md hover:bg-green-700 transition-all duration-300"
        style={{
          position: "absolute",
          right: collapsed ? "1rem" : "15px",
          top: collapsed ? "23rem" : "50%",
          transform: collapsed ? "translateY(0)" : "translateY(-50%)",
        }}
      >
        {collapsed ? <ArrowRightOutlined className="text-sm" /> : <ArrowLeftOutlined className="text-sm" />}
      </button>
    </aside>
  );
}
