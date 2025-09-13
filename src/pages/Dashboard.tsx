import { useState } from "react";
import TopNav from "../components/TopNav";
import Sidebar from "../components/Sidebar";

function renderContent(selectedKey: string | null, items: any[]) {
  if (!selectedKey) return <p>Select a menu item to see content.</p>;

  const selectedItem = items.find((item) => item.key === selectedKey);

  if (!selectedItem) return <p>Unknown menu item selected.</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#3F842E] mb-4">{selectedItem.label}</h1>
      <p className="text-gray-700">This is the {selectedItem.label} page content.</p>
    </div>
  );
}

export default function Dashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<string>("dashboard");

  const items = [
    { key: "dashboard", label: "Dashboard" },
    { key: "userProfile", label: "User Profile" },
    { key: "biodiversityProjects", label: "Biodiversity Projects" },
    { key: "stakeholder", label: "Stakeholder" }
  ];

  return (
    <div className="h-screen flex flex-col">
      <TopNav />

      <div className="flex flex-1 relative">
        {/* Sidebar */}
        <Sidebar
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
          onSelect={setSelectedMenu} // ✅ Pass handler
        />

        {/* Main content */}
        <div
          className="flex-1 overflow-y-auto p-6 transition-all duration-300"
          style={{ marginLeft: sidebarCollapsed ? "114px" : "334px" }}
        >
          {renderContent(selectedMenu, items)}
        </div>
      </div>
    </div>
  );
}
