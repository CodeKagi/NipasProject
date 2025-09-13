import React from "react";
import { Outlet } from "react-router-dom";
import TopNav from "../components/TopNav";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  return (
    <div className="h-screen flex flex-col">
      <TopNav />

      <div className="flex flex-1 relative">
        <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

        <div className="flex-1 overflow-y-auto p-6 transition-all duration-300" style={{ marginLeft: sidebarCollapsed ? "114px" : "334px" }}>
          <Outlet /> 
        </div>
      </div>
    </div>
  );
}
