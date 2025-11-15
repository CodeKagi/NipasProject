import { useNavigate } from "react-router-dom";

export default function MyTasks() {
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
          to: "/dashboard/completed",
        },
        {
          key: "deferred",
          label: "Deferred",
          subtitle: "No tasks",
          value: 0,
          color: "#3F842E",
          topBg: "#F2FAF4",
          to: "/dashboard/deferred",
        },
        {
          key: "pendingInfo",
          label: "Pending Information",
          subtitle: "Receive & Distribute",
          value: 0,
          color: "#FF8A2B",
          topBg: "#FFF5EE",
          to: "/dashboard/pending-info",
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
            style={{ border: `2px solid ${c.color}`, borderRadius: 8, overflow: "hidden" }}
          >
            <div className="flex justify-end items-center px-4 py-3" style={{ background: c.topBg, borderBottom: `2px solid ${c.color}` }}>
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
