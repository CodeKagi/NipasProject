import React from "react";
import { Collapse } from "antd";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const { Panel } = Collapse;

interface AccordionItem {
  key: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
}

export default function CustomAccordion({ items }: AccordionProps) {
  return (
    <Collapse
      bordered={false}
      expandIconPosition="end"
      expandIcon={({ isActive }) =>
        isActive ? (
          <Minus className="text-[#3F842E] w-5 h-5" />
        ) : (
          <Plus className="text-[#3F842E] w-5 h-5" />
        )
      }
      className="space-y-2"
    >
      {items.map((item) => (
        <Panel
          key={item.key}
          header={
            <span className="text-[#3F842E] font-medium">{item.title}</span>
          }
          className="!border !border-[rgba(75,75,75,0.35)] !rounded-lg overflow-hidden"
        >
          <AnimatePresence initial={false}>
            <motion.div
              key={item.key}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="p-2 text-gray-700"
            >
              {item.content}
            </motion.div>
          </AnimatePresence>
        </Panel>
      ))}
    </Collapse>
  );
}
