import { Input, Select, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";
import { useNavigate } from "react-router-dom";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import type { ColDef, RowClickedEvent } from "ag-grid-community";

import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
    
    ModuleRegistry.registerModules([ AllCommunityModule ])

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

  // ---------- AG GRID COLUMN DEFINITIONS (typed) ----------
  const columnDefs: ColDef<AppRow>[] = [
    {
      headerName: "Application ID",
      field: "applicationId" as keyof AppRow, // cast to keyof AppRow
      width: 140,
      cellStyle: { fontFamily: "monospace", fontSize: "13px" },
    },
    { headerName: "Applicant", field: "applicant" as keyof AppRow, flex: 1 },
    { headerName: "Permit Holder", field: "permitHolder" as keyof AppRow, flex: 1 },
    { headerName: "Application Type", field: "applicationType" as keyof AppRow, flex: 1.2 },
    { headerName: "Application Status", field: "applicationStatus" as keyof AppRow, width: 160 },
    { headerName: "Processing Division", field: "processingDivision" as keyof AppRow, flex: 1 },
    { headerName: "Responsible Official", field: "responsibleOfficial" as keyof AppRow, flex: 1 },
    {
      headerName: "Info",
      field: "info" as keyof AppRow,
      flex: 1.5,
      cellStyle: { fontSize: "12px", color: "#555" },
    },
  ];

  // ---------- FILTER BASED ON SEARCH ----------
  const filtered = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return data;
    return data.filter((r) =>
      Object.values(r).join(" ").toLowerCase().includes(q)
    );
  }, [search, data]);

  // ---------- ROW CLICK ----------
  const onRowClicked = React.useCallback((event: RowClickedEvent<AppRow>) => {
    const row = event.data;
    if (!row) return;
    navigate(`/dashboard/application/${row.applicationId}`, {
      state: { applicationType: row.applicationType, title: row.applicationType },
    });
  }, [navigate]);

  return (
    <div className="space-y-4">
      {/* Search + page size */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex-1">
          <Input
            placeholder="Search by ID, applicant, or type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            allowClear
            className="rounded-md"
          />
        </div>

        <div className="flex items-center gap-3">
          <Select
            value={pageSize}
            onChange={(val) => setPageSize(Number(val))}
            options={[5, 10, 25, 50].map((n) => ({ label: `${n} entries`, value: n }))}
            style={{ width: 120 }}
          />
        </div>
      </div>

      {/* AG Grid container */}
      <div className="ag-theme-quartz h-[600px] w-full rounded-lg border border-gray-200 shadow">
        <AgGridReact<AppRow>
          rowData={filtered}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={pageSize}
          onRowClicked={onRowClicked}
          rowSelection="single"
          defaultColDef={{ resizable: true, sortable: false, filter: false }}
          overlayLoadingTemplate={'<span class="loading">Loading...</span>'}
        />
      </div>

      <div className="text-sm text-gray-600">Showing {filtered.length} applications</div>
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
