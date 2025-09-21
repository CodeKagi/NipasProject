import React from "react";
import StatCard from "../components/StatCard";
import QuickActions from "../components/QuickActions";
import RecentApplications from "../components/RecentApplications";
import type { Application } from "../Models/Application";


export default function DashboardPage() {
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

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-800  mb-4">Dashboard</h1>
      <p className="text-gray-700 mb-10 text-sm">
        Welcome back! Here’s what’s happening with your applications.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4  mb-10">
        <StatCard value={5} label="Active Applications" bgColor="bg-[#3F842E]" />
        <StatCard value={2} label="Pending Review" bgColor="bg-[#2E3F84]" />
        <StatCard value={8} label="Approved This Year" bgColor="bg-[#842E3F]" />
        <StatCard value={15} label="Days Avg Processing" bgColor="bg-[#727672]" />
      </div>

      <QuickActions />
      
       <RecentApplications applications={applications} />
    </div>
  );
}
