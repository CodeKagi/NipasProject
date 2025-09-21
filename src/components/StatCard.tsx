import React from "react";
import { motion } from "framer-motion";

interface StatCardProps {
  value: number | string;
  label: string;
  bgColor: string;
}

export default function StatCard({ value, label, bgColor }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className={`${bgColor} rounded-md w-80 h-28 flex flex-col items-center justify-center shadow-md cursor-pointer transition-shadow duration-300 hover:shadow-lg`}
    >
      <span className="text-white text-3xl font-bold">{value}</span>
      <span className="text-white text-sm">{label}</span>
    </motion.div>
  );
}
