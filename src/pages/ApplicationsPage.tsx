import { Input, Select, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";
import { useNavigate } from "react-router-dom";

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

type AppRow = {
  id: string;
  applicationId: string;
  applicant: string;
  permitHolder: string;
  applicationType: string;
  applicationStatus: string;
  processingDivision: string;
  responsibleOfficial: string;
  info: string;
};

const MOCK_DATA: AppRow[] = [
  {
    id: "4518",
    applicationId: "4518",
    applicant: "Thabo Jacob Pelo",
    permitHolder: "Thabo Jacob Pelo",
    applicationType: "Hunt DCA - Large Predator (Lion)",
    applicationStatus: "Pending Approval",
    processingDivision: "Dr Kenneth Kaunda District",
    responsibleOfficial: "Charlotte Gumba",
    info: "Step 8d 9h 45m Overdue · Application Due In 3d 12h 12m",
  },
  {
    id: "9628",
    applicationId: "9628",
    applicant: "Marie Peterson",
    permitHolder: "Marie Peterson",
    applicationType: "Hunt Dangerous Game",
    applicationStatus: "Pending Approval",
    processingDivision: "Dr Ruth Segomotsi Mompati District",
    responsibleOfficial: "Naledi East",
    info: "Step 8d 9h 45m Overdue · Application Due In 3d 12h 12m",
  },
  {
    id: "1541",
    applicationId: "1541",
    applicant: "Jackie Felicia Hart",
    permitHolder: "Jackie Felicia Hart",
    applicationType: "Import a living wild animal",
    applicationStatus: "Pending Approval",
    processingDivision: "Dr Kenneth Kaunda District",
    responsibleOfficial: "Jabulani Dlomo",
    info: "Step 8d 9h 45m Overdue · Application Due In 3d 12h 12m",
  },
  {
    id: "4516",
    applicationId: "4516",
    applicant: "Thabo Jacob Pelo",
    permitHolder: "Thabo Jacob Pelo",
    applicationType: "Hunt DCA - Large Predator (Lion)",
    applicationStatus: "Pending Approval",
    processingDivision: "Dr Kenneth Kaunda District",
    responsibleOfficial: "Charlotte Gumba",
    info: "Step 8d 9h 45m Overdue · Application Due In 3d 12h 12m",
  },
  {
    id: "9629",
    applicationId: "9629",
    applicant: "Marie Peterson",
    permitHolder: "Marie Peterson",
    applicationType: "Hunt Dangerous Game",
    applicationStatus: "Pending Approval",
    processingDivision: "Dr Ruth Segomotsi Mompati District",
    responsibleOfficial: "Naledi East",
    info: "Step 8d 9h 45m Overdue · Application Due In 3d 12h 12m",
  },
  {
    id: "1543",
    applicationId: "1543",
    applicant: "Jackie Felicia Hart",
    permitHolder: "Jackie Felicia Hart",
    applicationType: "Import a living wild animal",
    applicationStatus: "Pending Approval",
    processingDivision: "Dr Kenneth Kaunda District",
    responsibleOfficial: "Jabulani Dlomo",
    info: "Step 8d 9h 45m Overdue · Application Due In 3d 12h 12m",
  },
    {
    id: "4519",
    applicationId: "4519",
    applicant: "Thabo Jacob Pelo",
    permitHolder: "Thabo Jacob Pelo",
    applicationType: "Hunt DCA - Large Predator (Lion)",
    applicationStatus: "Pending Approval",
    processingDivision: "Dr Kenneth Kaunda District",
    responsibleOfficial: "Charlotte Gumba",
    info: "Step 8d 9h 45m Overdue · Application Due In 3d 12h 12m",
  },
  {
    id: "9621",
    applicationId: "9621",
    applicant: "Marie Peterson",
    permitHolder: "Marie Peterson",
    applicationType: "Hunt Dangerous Game",
    applicationStatus: "Pending Approval",
    processingDivision: "Dr Ruth Segomotsi Mompati District",
    responsibleOfficial: "Naledi East",
    info: "Step 8d 9h 45m Overdue · Application Due In 3d 12h 12m",
  },
  {
    id: "1549",
    applicationId: "1549",
    applicant: "Jackie Felicia Hart",
    permitHolder: "Jackie Felicia Hart",
    applicationType: "Import a living wild animal",
    applicationStatus: "Pending Approval",
    processingDivision: "Dr Kenneth Kaunda District",
    responsibleOfficial: "Jabulani Dlomo",
    info: "Step 8d 9h 45m Overdue · Application Due In 3d 12h 12m",
  },
  
];

function fetchApplicationsMock(): Promise<AppRow[]> {
  return new Promise((resolve) => setTimeout(() => resolve(MOCK_DATA), 300));
  // Replace with real API:
  // return fetch('/api/applications?status=pending').then(res => res.json());
}


export default function ApplicationsPage() {
  // read injected user like other pages do
  const rawUser = (window as any).__USER__;

  // produce a correctly-typed role (UserRole)
  const role: UserRole = React.useMemo(() => getRoleFromRawUser(rawUser), [rawUser]);

  return (
    <div>
      {role === "user" && <UserApplicationsView />}
      {role === "central-officer" && <CentralOfficerApplicationsView />}
      {role === "admin" && <AdminApplicationsView />}
    </div>
  );
}

function UserApplicationsView() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-[#3F842E] mb-4">Applications</h1>
      <p className="text-gray-700">This is the User Applications content.</p>
    </div>
  );
}

export function CentralOfficerApplicationsView() {
  const navigate = useNavigate();

  const [data, setData] = React.useState<AppRow[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [pageSize, setPageSize] = React.useState<number>(10);
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  React.useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const res = await fetchApplicationsMock();
        if (!cancelled) setData(res);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // Filtered data based on search
  const filtered = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return data;
    return data.filter((r) =>
      [r.applicationId, r.applicant, r.applicationType, r.permitHolder, r.applicationStatus]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [data, search]);

  // Table columns (pixel-close to design)
  const columns: ColumnsType<AppRow> = [
    {
      title: "Application ID",
      dataIndex: "applicationId",
      key: "applicationId",
      width: 120,
      render: (text) => <span className="font-mono text-sm">{text}</span>,
    },
    {
      title: "Applicant",
      dataIndex: "applicant",
      key: "applicant",
      render: (text) => <div className="whitespace-pre-wrap text-sm">{text}</div>,
    },
    {
      title: "Permit Holder",
      dataIndex: "permitHolder",
      key: "permitHolder",
      render: (text) => <div className="text-sm">{text}</div>,
    },
    {
      title: "Application Type",
      dataIndex: "applicationType",
      key: "applicationType",
      render: (text) => <div className="text-sm">{text}</div>,
    },
    {
      title: "Application Status",
      dataIndex: "applicationStatus",
      key: "applicationStatus",
      width: 160,
      render: (text) => <div className="text-sm">{text}</div>,
    },
    {
      title: "Processing Division",
      dataIndex: "processingDivision",
      key: "processingDivision",
      render: (text) => <div className="text-sm">{text}</div>,
    },
    {
      title: "Responsible Official",
      dataIndex: "responsibleOfficial",
      key: "responsibleOfficial",
      render: (text) => <div className="text-sm">{text}</div>,
    },
    {
      title: "Info",
      dataIndex: "info",
      key: "info",
      render: (text) => <div className="text-xs text-gray-600">{text}</div>,
    },
  ];

  // Pagination config for Ant Table
  const pagination = {
    current: currentPage,
    pageSize,
    total: filtered.length,
    showSizeChanger: false,
    onChange: (page: number, size?: number) => {
      setCurrentPage(page);
      if (size) setPageSize(size);
    },
  };
  const onRowClick = (record: AppRow) => {
    navigate(`/dashboard/application/${record.applicationId}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex-1">
          <Input
            placeholder="Search by ID, applicant, or type..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            allowClear
            className="rounded-md"
          />
        </div>

        <div className="flex items-center gap-3">
          <Select
            value={pageSize}
            onChange={(val) => {
              setPageSize(Number(val));
              setCurrentPage(1);
            }}
            options={[5, 10, 25, 50].map((n) => ({ label: `${n} entries`, value: n }))}
            style={{ width: 120 }}
            size="middle"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-[0_8px_20px_rgba(0,0,0,0.06)] border border-gray-200 p-3">
        <Table
          columns={columns}
          dataSource={filtered}
          loading={loading}
          pagination={pagination}
          rowKey="applicationId"
          onRow={(record) => ({
            onClick: () => onRowClick(record),
            onKeyDown: (e: React.KeyboardEvent) => {
              if (e.key === "Enter") onRowClick(record);
            },
            tabIndex: 0,
            style: { cursor: "pointer" } as any,
          })}
          size="middle"
          bordered={false}
          rowClassName={() => "hover:bg-gray-50"}
        />
        <div className="mt-2 text-sm text-gray-600">Showing {filtered.length} applications</div>

        {/* simple pagination indicator (pixel-ish): green circle with page number on bottom-right */}
        {/* <div className="flex justify-end mt-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="px-2 py-1 rounded border"
            >
              &lt;
            </button>
            <div className="w-8 h-8 rounded-full bg-[#3F842E] text-white flex items-center justify-center font-bold">
              {currentPage}
            </div>
            <button
              onClick={() =>
                setCurrentPage((p) => {
                  const max = Math.max(1, Math.ceil(filtered.length / pageSize));
                  return Math.min(p + 1, max);
                })
              }
              className="px-2 py-1 rounded border"
            >
              &gt;
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
}

function AdminApplicationsView() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-[#3F842E] mb-4">Admin – Applications</h1>
      <p className="text-gray-700">Admin view (placeholder).</p>
    </div>
  );
}
