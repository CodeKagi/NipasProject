import React from "react";
import type { Application } from "../Models/Application";


const statusColors: Record<string, { bg: string; text: string }> = {
    "In Review": { bg: "#2E3F84", text: "#FFFFFF" },      
    "Pending Payment": { bg: "#842E3F", text: "#FFFFFF" },
    "Approved": { bg: "#16A34A", text: "#FFFFFF" },      
    "Rejected": { bg: "#4B5563", text: "#FFFFFF" },    
};

interface RecentApplicationsProps {
    applications: Application[];
}

const RecentApplications: React.FC<RecentApplicationsProps> = ({ applications }) => {
    return (
        <div className="mt-6  mb-10">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Applications</h2>
            <div className="space-y-4">
                {applications.map((app) => (
                    <div
                        key={app.id}
                        className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white"
                    >
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <h3 className="text-md font-semibold text-gray-900">{app.title}</h3>
                                <p className="text-sm text-gray-600">Application ID: {app.id}</p>
                            </div>


                            <span
                                className="px-3 py-1 rounded-full text-xs font-medium"
                                style={{
                                    backgroundColor: statusColors[app.status]?.bg,
                                    color: statusColors[app.status]?.text,
                                }}
                            >
                                {app.status}
                            </span>

                        </div>
                        <div className="grid grid-cols-4 gap-4 text-sm">
                            <div>
                                <p className="text-gray-500">Submitted</p>
                                <p className="font-semibold">{app.submitted}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Type</p>
                                <p className="font-semibold">{app.type}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Est. Completion</p>
                                <p className="font-semibold">{app.completion}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Fee</p>
                                <p className="font-semibold">{app.fee}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentApplications;
