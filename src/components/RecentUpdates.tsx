import React from 'react';
import { BellRing } from 'lucide-react';
import { Card } from 'antd';
import type { UpdateItem } from '../Models/UpdateItem';

interface RecentUpdatesProps {
  updates: UpdateItem[];
}

const typeColors: Record<string, string> = {
  success: "#2E3F84", 
  warning: "#842E3F", 
  info: "#727672",   
};

export default function RecentUpdates({ updates }: RecentUpdatesProps) {
  return (
    <div className="border border-gray-200 rounded-lg shadow-sm bg-white mb-10">

      <div className="flex items-center gap-2 px-4 pt-4 mb-6">
        <BellRing className="w-6 h-6 text-green-600" fill="currentColor" />
        <h2 className="text-lg font-semibold text-gray-900">Recent Updates</h2>
      </div>

  
      <div className="space-y-3 px-4 pb-4">
        {updates.map((update) => (
          <Card
            key={update.id}
            className="shadow-sm hover:shadow-md transition-shadow border-l-4 rounded-lg border border-gray-200"
            bodyStyle={{ padding: '16px' }}
            style={{ borderLeftColor: typeColors[update.type] }}
          >
            <div className="space-y-1">
              <h3 className="font-medium text-gray-900 text-sm">{update.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{update.description}</p>
              <p className="text-gray-500 text-xs mt-2">{update.timestamp}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
