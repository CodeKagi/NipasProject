import React from "react";
import { Menu } from "antd";
import {
  UserOutlined,
  HomeOutlined,
  FileTextOutlined,
  TeamOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import forgotPasswordLogo from "../assets/forgotPasswordLogo.svg";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const items = [
    { key: "1", icon: <HomeOutlined />, label: "Dashboard" },
    { key: "2", icon: <UserOutlined />, label: "User Profile" },
    { key: "3", icon: <FileTextOutlined />, label: "Biodiversity Projects" },
    { key: "4", icon: <TeamOutlined />, label: "Stakeholder" },
  ];

  return (
    <aside
      className={`fixed bg-white border-[5px] border-[#3F842E] rounded-[50px] shadow-lg p-6 z-[999] transition-all duration-300`}
      style={{
        width: collapsed ? "80px" : "300px",
        height: "calc(100vh - 98px)", 
        top: "24px", 
        left: "34px",
        opacity: 1,
      }}
    >
      {/* Logo */}
      <div className="flex justify-center mb-6">
        {!collapsed && <img src={forgotPasswordLogo} alt="Logo" className="h-16" />}
      </div>

      {/* Toggle button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute right-[-15px] top-1/2 transform -translate-y-1/2 bg-[#3F842E] text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md hover:bg-green-700 transition"
      >
        {collapsed ? <ArrowRightOutlined className="text-sm" /> : <ArrowLeftOutlined className="text-sm" />}
      </button>

      {/* Menu */}
      <Menu
        mode="vertical"
        inlineCollapsed={collapsed}
        items={items.map((item) => ({
          ...item,
          icon: React.cloneElement(item.icon, {
            style: { fontSize: collapsed ? 24 : 16, display: "flex", alignItems: "center", justifyContent: "center" },
          }),
        }))}
        style={{ borderInlineEnd: "none", height: "100%" }}
        className="bg-transparent [&>.ant-menu-item]:!text-[#3F842E] [&>.ant-menu-item]:!font-bold [&>.ant-menu-item]:flex [&>.ant-menu-item]:items-center [&>.ant-menu-item]:justify-start [&>.ant-menu-item:hover]:!underline"
      />
    </aside>
  );
}
