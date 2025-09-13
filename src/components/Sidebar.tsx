import React from "react";
import { Menu } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

import forgotPasswordLogo from "../assets/forgotPasswordLogo.svg";
import collapsedSideNavLogo from "../assets/collapsedSideNavLogo.svg";
import dashBoardIcon from "../assets/dashBoardicon.svg";
import biodiversityProjectsIcon from "../assets/biodiversityProjectsIcon.svg";
import stakeholderIcon from "../assets/stakeholderIcon.svg";
import userProfileIcon from "../assets/userProfileIcon.svg";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
  isPreview?: boolean;
}

export default function Sidebar({ collapsed, setCollapsed, isPreview = false }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { key: "/dashboard", icon: <img src={dashBoardIcon} alt="Dashboard" className="w-6 h-6" />, label: "Dashboard" },
    { key: "/dashboard/user-profile", icon: <img src={userProfileIcon} alt="User Profile" className="w-6 h-6" />, label: "User Profile" },
    { key: "/dashboard/biodiversity-projects", icon: <img src={biodiversityProjectsIcon} alt="Biodiversity Projects" className="w-6 h-6" />, label: "Biodiversity Projects" },
    { key: "/dashboard/stakeholder", icon: <img src={stakeholderIcon} alt="Stakeholder" className="w-6 h-6" />, label: "Stakeholder" },
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
      <div className="flex justify-center transition-all duration-300" style={{ marginTop: collapsed ? "40px" : "4px", marginBottom: "40px" }}>
        <img src={collapsed ? collapsedSideNavLogo : forgotPasswordLogo} alt="Logo" className={`transition-all duration-300 ${collapsed ? "h-10 w-[5rem]" : "h-16"}`} />
      </div>

      <div className="flex-1 overflow-hidden">
        <Menu
          mode="inline"
          inlineCollapsed={collapsed}
          selectedKeys={[location.pathname]}
          items={items.map((item) => ({
            ...item,
            icon: React.cloneElement(item.icon, {
              style: {
                fontSize: collapsed ? 30 : 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: collapsed ? 40 : 24,
                transition: "all 0.3s ease",
              },
            }),
          }))}
          style={{ borderInlineEnd: "none", height: "100%", transition: "all 0.3s ease" }}
          className={`bg-transparent 
  [&>.ant-menu-item]:!font-bold 
  [&>.ant-menu-item]:flex 
  [&>.ant-menu-item]:items-center 
  [&>.ant-menu-item]:justify-start 
  [&>.ant-menu-item]:!text-[#3F842E] 
  [&>.ant-menu-item:hover]:!underline
  [&>.ant-menu-item-selected]:!bg-[rgba(63,132,46,0.6)] 
  [&>.ant-menu-item-selected>span]:!text-white
  [&>.ant-menu-item-icon]:!min-w-[50px]
  ${collapsed ? " [&>.ant-menu-item]:!p-[11px] [&>.ant-menu-item-icon]:text-2xl" : ""}`}

          onClick={(info) => navigate(info.key)}
        />
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
