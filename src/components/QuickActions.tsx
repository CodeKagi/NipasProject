import { motion } from "framer-motion";
import { FileTextOutlined, ReloadOutlined, LineChartOutlined, UserOutlined } from "@ant-design/icons";

interface ActionItem {
    title: string;
    description: string;
    icon: JSX.Element;
}

const actions: ActionItem[] = [
    {
        title: "New Permit Application",
        description: "Start a new application for building, business, or event permits",
        icon: <FileTextOutlined className="text-white text-xl" />,
    },
    {
        title: "Renew License",
        description: "Renew your existing license before they expire",
        icon: <ReloadOutlined className="text-white text-xl" />,
    },
    {
        title: "Track Applications",
        description: "Monitor the status of your current applications",
        icon: <LineChartOutlined className="text-white text-xl" />,
    },
    {
        title: "Update Profile",
        description: "Keep your personal and business information up to date",
        icon: <UserOutlined className="text-white text-xl" />,
    },
];

export default function QuickActions() {
    return (
        <div className="mt-6 mb-10">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {actions.map((action, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.02, boxShadow: "0 8px 16px rgba(0,0,0,0.15)" }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="flex items-start p-4 bg-white rounded-lg shadow border border-gray-200 cursor-pointer"
                    >
                        <div className="flex items-center justify-center w-10 h-10 rounded-md bg-[#3F842E] mr-4">
                            {action.icon}
                        </div>
                        <div>
                            <h3 className="text-md font-semibold text-gray-900">{action.title}</h3>
                            <p className="text-sm text-gray-600">{action.description}</p>
                        </div>
                    </motion.div>


                ))}
            </div>
        </div>
    );
}
