import React from "react";
import StatCard from "../components/StatCard";
import QuickActions from "../components/QuickActions";
import RecentApplications from "../components/RecentApplications";
import type { Application } from "../Models/Application";
import RecentUpdates from "../components/RecentUpdates";
import type { UpdateItem } from "../Models/UpdateItem";
import SupportCard from "../components/SupportCard";
import { Clock, Mail, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function DashboardPage() {

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

  const isCentralOfficer = (currentUser.roles ?? []).includes("CENTRAL_OFFICER");


  const applications: Application[] = [
    {
      id: "BL-2024-000892",
      title: "Angle - Permit",
      type: "Permit",
      submitted: "Sept 8, 2025",
      completion: "Sept 20, 2025",
      fee: "R2450.00",
      status: "In Review",
    },
    {
      id: "BL-2024-000153",
      title: "Hunting (Bird Only) - License",
      type: "License",
      submitted: "Sept 8, 2025",
      completion: "Sept 15, 2025",
      fee: "R1450.00",
      status: "Pending Payment",
    },
  ];

  const updates: UpdateItem[] = [
    { id: "1", title: "Application Approved", description: "EP-2024-156 approved", timestamp: "2h ago", type: "success" },
    { id: "2", title: "Payment Required", description: "R1,200 due", timestamp: "1d ago", type: "warning" },
    { id: "3", title: "Document Request", description: "Additional docs required", timestamp: "2d ago", type: "info" },
  ];

 
  function OfficerTasksPanel() {
  const navigate = useNavigate();

  const cards = [
    {
      key: "pending",
      label: "Pending",
      subtitle: "Receive & Distribute",
      value: 5,
      color: "#FF8A2B",
      topBg: "#FFF5EE",
      to: "/dashboard/pending",
    },
    {
      key: "completed",
      label: "Completed",
      subtitle: "No tasks",
      value: 0,
      color: "#3F842E",
      topBg: "#F2FAF4",
      to: "/dashboard/tasks/completed",
    },
    {
      key: "deferred",
      label: "Deferred",
      subtitle: "No tasks",
      value: 0,
      color: "#3F842E",
      topBg: "#F2FAF4",
      to: "/dashboard/tasks/deferred",
    },
    {
      key: "pendingInfo",
      label: "Pending Information",
      subtitle: "Receive & Distribute",
      value: 0,
      color: "#FF8A2B",
      topBg: "#FFF5EE",
      to: "/dashboard/tasks/pending-info",
    },
  ];

  const stats = [
    { label: "Total Tasks", value: "15", bg: "#2f7f38" },
    { label: "Completion Rate", value: "0%", bg: "#0633d1" },
    { label: "Pending Tasks", value: "5", bg: "#ff8a2b" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-md bg-white p-5 shadow-[0_6px_10px_rgba(0,0,0,0.06)] border border-gray-200" style={{ borderRadius: 8 }}>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-2xl text-gray-600">👤</div>
          <div>
            <h3 className="text-2xl font-extrabold">My Tasks</h3>
            <p className="text-sm text-gray-500">Given Hadebe</p>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div
            key={c.key}
            role="button"
            tabIndex={0}
            onClick={() => navigate(c.to)}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && navigate(c.to)}
            className="rounded-md bg-white shadow-[0_6px_10px_rgba(0,0,0,0.04)] transform transition-all duration-200 hover:-translate-y-1 hover:shadow-lg focus:shadow-outline outline-none cursor-pointer"
            style={{ border: `1.5px solid ${c.color}`, borderRadius: 8, overflow: "hidden" }}
          >
            <div className="flex justify-end items-center px-4 py-3" style={{ background: c.topBg, borderBottom: `4px solid ${c.color}` }}>
              <span className="text-2xl sm:text-3xl font-extrabold" style={{ color: "#111827" }}>{c.value}</span>
            </div>

            <div className="p-4">
              <div className="font-semibold text-gray-800">{c.label}</div>
              <div className="text-xs text-gray-500 mt-1">{c.subtitle}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-md p-4 shadow-[0_6px_10px_rgba(0,0,0,0.06)]" style={{ background: s.bg, color: "white", borderRadius: 8 }}>
            <div className="text-sm">{s.label}</div>
            <div className="text-2xl font-bold mt-2">{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
  

  // --------------------------
  // Normal dashboard layout (your original)
  // --------------------------
  function NormalDashboard() {
    return (
      <div>
        <h1 className="text-xl font-bold text-gray-800 mb-4">Dashboard</h1>
        <p className="text-gray-700 mb-10 text-sm">Welcome back! Here’s what’s happening with your applications.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <StatCard value={5} label="Active Applications" bgColor="bg-[#3F842E]" />
          <StatCard value={2} label="Pending Review" bgColor="bg-[#2E3F84]" />
          <StatCard value={8} label="Approved This Year" bgColor="bg-[#842E3F]" />
          <StatCard value={15} label="Days Avg Processing" bgColor="bg-[#727672]" />
        </div>

        <QuickActions />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <RecentApplications applications={applications} />
          <div className="space-y-6">
            <RecentUpdates updates={updates} />
            <SupportCard
              description="Contact our support team for assistance with your applications."
              contacts={[
                { icon: <Phone className="w-4 h-4 text-gray-600" />, label: "Phone", value: "011 123 4567" },
                { icon: <Mail className="w-4 h-4 text-gray-600" />, label: "Email", value: "support@dedect.com" },
                { icon: <Clock className="w-4 h-4 text-gray-600" />, label: "Hours", value: "6AM - 5PM (Mon-Fri)" },
              ]}
            />
          </div>
        </div>
      </div>
    );
  }

  // --------------------------
  // Render: choose view based on role
  // --------------------------
  return <div>{isCentralOfficer ? <OfficerTasksPanel /> : <NormalDashboard />}</div>;
}
