import { Card, Typography } from "antd";
import { div } from "framer-motion/client";
import { BellRing, TreePine } from "lucide-react";
import type { ReactNode } from "react";

const { Title, Text } = Typography;

interface ContactInfo {
  icon: ReactNode;
  label: string;
  value: string;
}

interface SupportCardProps {
  title?: string;
  description?: string;
  contacts: ContactInfo[];
}

export default function SupportCard({
  title = "Need Help?",
  description,
  contacts,
}: SupportCardProps) {
  return (
    <div className="flex items-center justify-center">
      <Card className="w-full shadow-lg border-0 bg-white rounded-2xl">
        <div className="space-y-6 ">

          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full flex items-center justify-center">
               <BellRing className="w-6 h-6 text-green-600" fill="currentColor" />
            </div>
            <Title level={4} className="!mb-0 !text-gray-900 text-left">
              {title}
            </Title>

          </div>


          {description && (
            <Text className="text-gray-600 text-base leading-relaxed block text-left">
              {description}
            </Text>
          )}


          <div className="space-y-4 pt-4">
            {contacts.map((contact, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  {contact.icon}
                </div>
                <div className="text-left">
                  <Text strong className="text-gray-900 block">
                    {contact.label}:
                  </Text>
                  <Text className="text-gray-700">{contact.value}</Text>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
