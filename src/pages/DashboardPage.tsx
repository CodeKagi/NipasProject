import React from "react";
import StatCard from "../components/StatCard";
import QuickActions from "../components/QuickActions";
import RecentApplications from "../components/RecentApplications";
import type { Application } from "../Models/Application";
import RecentUpdates from "../components/RecentUpdates";
import type { UpdateItem } from "../Models/UpdateItem";
import SupportCard from "../components/SupportCard";
import { Clock, Mail, Phone } from "lucide-react";
import MyTasks from "./MyTasks";

type UserRole = "user" | "admin" | "central-officer";

function getRoleFromRawUser(raw: any): UserRole {
  if (!raw) return "central-officer";

  if (Array.isArray(raw.roles)) {
    if (raw.roles.includes("CENTRAL_OFFICER")) return "central-officer";
    if (raw.roles.includes("ADMIN")) return "admin";
    if (raw.roles.includes("USER")) return "user";
  }

  if (typeof raw.role === "string") {
    if (raw.role === "CENTRAL_OFFICER") return "central-officer";
    if (raw.role === "ADMIN") return "admin";
    if (raw.role === "USER") return "user";
  }

  return "user";
}

export default function DashboardPage() {

  const rawUser = (window as any).__USER__;

  const role: UserRole = React.useMemo(() => getRoleFromRawUser(rawUser), [rawUser]);

  const isCentralOfficer = role === "central-officer";

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
    return (
      <div className="space-y-6">
        <MyTasks />
      </div>
    );
  }

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
