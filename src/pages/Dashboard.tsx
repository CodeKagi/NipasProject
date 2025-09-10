import { useState } from "react";
import TopNav from "../components/TopNav";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="h-screen flex flex-col">
      <TopNav />

      <div className="flex flex-1 relative">
        {/* Sidebar */}
        <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

        {/* Main content */}
        <div
          className="flex-1 overflow-y-auto p-6 transition-all duration-300"
          style={{
            marginLeft: sidebarCollapsed ? "114px" : "334px", // adjust to match sidebar width + left offset
          }}
        >
          <h1 className="text-2xl font-bold text-[#3F842E] mb-4">Dashboard</h1>
          <p className="text-gray-700">
            Main dashboard content goes here. Scrollable while nav stays sticky.
          </p>
          <p>Lorem ipsum dolor sit amet...</p>
          <p>Lorem ipsum dolor sit amet...</p>
          <p>Lorem ipsum dolor sit amet...</p>
          <p>Lorem ipsum dolor sit amet...</p>
          <p>Lorem ipsum dolor sit amet...</p>
               <p>Lorem ipsum dolor sit amet...</p>
          <p>Lorem ipsum dolor sit amet...</p>
          <p>Lorem ipsum dolor sit amet...</p>
          <p>Lorem ipsum dolor sit amet...</p>
          <p>Lorem ipsum dolor sit amet...</p>
               <p>Lorem ipsum dolor sit amet...</p>
          <p>Lorem ipsum dolor sit amet...</p>
          <p>Lorem ipsum dolor sit amet...</p>
          <p>Lorem ipsum dolor sit amet...</p>
          <p>Lorem ipsum dolor sit amet...</p>
               <p>Lorem ipsum dolor sit amet...</p>
          <p>Lorem ipsum dolor sit amet...</p>
          <p>Lorem ipsum dolor sit amet...</p>
          <p>Lorem ipsum dolor sit amet...</p>
          <p>Lorem ipsum dolor sit amet...</p>

               <p>Lorem ipsum dolor sit amet...</p>
          <p>Lorem ipsum dolor sit amet...</p>
          <p>Lorem ipsum dolor sit amet...</p>
          <p>Lorem ipsum dolor sit amet...</p>
          <p>Lorem ipsum dolor sit amet...</p>
               <p>Lorem ipsum dolor sit amet...</p>
          <p>Lorem ipsum dolor sit amet...</p>
          <p>Lorem ipsum dolor sit amet...</p>
          <p>Lorem ipsum dolor sit amet...</p>
          <p>Lorem ipsum dolor sit amet...</p>
        </div>
      </div>
    </div>
  );
}
