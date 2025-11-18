import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { Collapse, Select, Button, Divider, Checkbox } from "antd";
import {
  DownOutlined,
  CheckSquareOutlined,
  ShareAltOutlined,
  SwapRightOutlined,
  InfoCircleOutlined,
  CloseCircleOutlined,
  BarsOutlined,
} from "@ant-design/icons";

const { Panel } = Collapse;

type AppDetail = {
  id: string;
  title: string;
  subtitle?: string;
  udrNumber: string;
  sections: { key: string; title: string; content: React.ReactNode }[];
};

const MOCK_APP: AppDetail = {
  id: "4518",
  title: "Hunt DCA - Large Predator (Lion) - Inspect & Recommend",
  udrNumber: "BOJ 12340/9/2025",
  sections: [
    { key: "applicant-details", title: "Applicant Details", content: null },
    { key: "permit-holder", title: "Permit Holder Details", content: null },
    { key: "validity", title: "Validity Period", content: null },
    { key: "time-frame", title: "Time Frame", content: null },
    { key: "activities", title: "Activities", content: null },
    { key: "methods", title: "Methods", content: null },
    { key: "species", title: "Species", content: null },
    { key: "foreigners", title: "Foreigners", content: null },
    { key: "other-parties", title: "Other Parties Involved", content: null },
    { key: "affected-parties", title: "Affected Parties", content: null },
    { key: "facilities", title: "Facilities", content: null },
    { key: "properties", title: "Properties", content: null },
    { key: "hunters", title: "Hunters", content: null },
    { key: "outfitters", title: "Outfitters", content: null },
    { key: "transport-from", title: "Transport From", content: null },
    { key: "transport-to", title: "Transport To", content: null },
    { key: "supporting-documents", title: "Supporting Documents", content: null },
    { key: "permit-attachments", title: "Permit Attachments (PDFs Preferred)", content: null },
    { key: "fees", title: "Fees", content: <div className="text-sm text-gray-700">Fees summary</div> },
    { key: "payments", title: "Payments", content: <div className="text-sm text-gray-700">Payments history</div> },
    { key: "general-conditions", title: "General & Standard Conditions", content: null },
    { key: "special-conditions", title: "Special Conditions", content: null },
  ],
};

function fetchApplicationDetail(id: string): Promise<AppDetail> {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ...MOCK_APP, id, title: MOCK_APP.title }), 250);
  });
}

type TabKey = "Application" | "My Tasks" | "Applicant Dialog" | "Official Dialog" | "Participants" | "Summary";

// Small helper component to show label/value pairs
const Labeled = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div>
    <div className="text-xs text-gray-500">{label}</div>
    <div className="font-semibold">{value}</div>
  </div>
);

/** MyTasksPanel - action bar + checklist */
function MyTasksPanel() {
  const [checkedValues, setCheckedValues] = React.useState<string[]>([]);

  const actionButtons = [
    { key: "recommend", icon: <CheckSquareOutlined />, label: "Recommend" },
    { key: "defer", icon: <SwapRightOutlined />, label: "Defer" },
    { key: "forward", icon: <ShareAltOutlined />, label: "Forward" },
    { key: "request-info", icon: <InfoCircleOutlined />, label: "Request Info" },
    { key: "not-approved", icon: <CloseCircleOutlined />, label: "Not Approved" },
  ];

  return (
    <div className="space-y-6">
      {/* Green action bar */}
      <div
        className="rounded-md border p-3"
        style={{
          borderColor: "#3F842E",
          borderWidth: 1.5,
          borderRadius: 8,
        }}
      >
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-[#dfeee0]" style={{ minWidth: 160 }}>
            <BarsOutlined className="text-[#3F842E]" />
            <strong style={{ color: "#3F842E" }}>Checklist</strong>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {actionButtons.map((a) => (
              <button
                key={a.key}
                type="button"
                className="flex items-center gap-2 px-3 py-1 rounded text-sm font-semibold hover:bg-[#f7fff6] focus:outline-none focus:ring-2 focus:ring-[#d9f0dc] transition"
                aria-label={a.label}
              >
                <span className="text-[#3F842E]">{a.icon}</span>
                <span className="text-xs text-gray-700">{a.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Checklist items */}
      <div>
        <Checkbox.Group value={checkedValues} onChange={(vals) => setCheckedValues(vals as string[])}>
          <div className="flex flex-col gap-4 mt-4">
            <label className="flex items-center gap-3">
              <Checkbox value="check-id" />
              <span className="text-sm">Check For ID</span>
            </label>

            <label className="flex items-center gap-3">
              <Checkbox value="check-payment" />
              <span className="text-sm">Check For Payment Of Application</span>
            </label>

            {/* You can add more checklist items here */}
          </div>
        </Checkbox.Group>
      </div>
    </div>
  );
}

export default function ApplicationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [app, setApp] = React.useState<AppDetail | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [division, setDivision] = React.useState<string | undefined>(undefined);
  const [step, setStep] = React.useState<string | undefined>(undefined);

  // tab state
  const [activeTab, setActiveTab] = React.useState<TabKey>("Application");

  React.useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const res = await fetchApplicationDetail(id ?? "4518");
        if (!cancelled) setApp(res);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const appTypeFromNav = (location.state as any)?.applicationType as string | undefined;

  // handlers
  const handleSendForward = () => alert(`Send Forward to division: ${division ?? "none selected"}`);
  const handleSendBack = () => alert(`Send Back to step: ${step ?? "none selected"}`);
  const handlePreview = () => alert("Preview Draft (placeholder)");

  const renderTabPlaceholder = (t: TabKey) => (
    <div className="bg-white rounded-md border border-gray-200 shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{t}</h3>
      <p className="text-sm text-gray-600">Placeholder content for <strong>{t}</strong>. Replace with real layout later.</p>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Top header */}
      <div className="bg-white rounded-md p-6 shadow-[0_8px_20px_rgba(0,0,0,0.06)] border border-gray-200" style={{ borderRadius: 8 }}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-3">
              <div className="px-3 py-1 rounded-md bg-[#E8F6EA] border border-[#D1EAD3] text-[#3F842E] text-sm font-semibold">
                <span className="text-xs">Application</span> {app?.id ?? id}
              </div>
            </div>

            <h2 className="mt-3 text-xl sm:text-2xl font-semibold text-gray-900">
              {appTypeFromNav ? `${appTypeFromNav}` : app?.title ?? "Loading application..."}
            </h2>
          </div>
          <div />
        </div>
      </div>

      {/* Main two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Tabs + content */}
        <div className="lg:col-span-8">
          {/* Tabs */}
          <div className="flex flex-wrap items-center gap-3 text-sm mb-3">
            {(["Application", "My Tasks", "Applicant Dialog", "Official Dialog", "Participants", "Summary"] as TabKey[]).map((t) => {
              const active = activeTab === t;
              return (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`px-3 py-1 rounded-md text-sm font-semibold transition ${active ? "text-[#3F842E]" : "text-gray-600 hover:text-gray-800"}`}
                  aria-pressed={active}
                >
                  {t}
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div>
            {activeTab === "Application" ? (
              <div className="bg-white rounded-md border border-gray-200 shadow-sm overflow-hidden">
                <Collapse
                  bordered={false}
                  defaultActiveKey={app?.sections?.[0]?.key ? [app.sections[0].key] : []}
                  expandIconPosition="right"
                  expandIcon={({ isActive }) => <DownOutlined rotate={isActive ? 180 : 0} />}
                  className="!bg-transparent"
                >
                  {app?.sections.map((s) => {
                    // Applicant details
                    if (s.key === "applicant-details") {
                      return (
                        <Panel
                          header={
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center gap-3">
                                <span className="text-sm font-semibold">{s.title}</span>
                              </div>
                              <div className="text-xs text-gray-500" />
                            </div>
                          }
                          key={s.key}
                          className="!border-t !border-gray-100"
                        >
                          <div className="p-4 text-sm text-gray-700 space-y-6">
                            <div>
                              <div className="text-sm font-bold text-[#3F842E] mb-3">Personal Details</div>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <Labeled label="Title" value="MR" />
                                <Labeled label="Initial(s)" value="TJ" />
                                <Labeled label="Surname" value="Pelo" />
                                <div className="sm:col-span-3">
                                  <Labeled label="Full Name(s)" value="Thabo Jacob" />
                                </div>
                                <Labeled label="Preferred Name" value="T-Boss" />
                                <Labeled label="Identity Type" value="ID" />
                                <Labeled label="ID/Passport Number" value="7812134857308" />
                              </div>
                            </div>

                            <div>
                              <div className="text-sm font-bold text-[#3F842E] mb-3">Contact Details</div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <Labeled label="Preferred Contact Method" value="Mobile" />
                                <Labeled label="Email" value="thabop@email.com" />
                                <Labeled label="Mobile" value="0812374657" />
                                <Labeled label="Alternative Mobile" value="0798475432" />
                                <Labeled label="Work" value="0118624759" />
                                <Labeled label="Telephone (Home)" value="0612385479" />
                              </div>
                            </div>

                            <div>
                              <div className="text-sm font-bold text-[#3F842E] mb-3">Address Details</div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <Labeled label="Residential Address type" value="Farm" />
                                <Labeled label="Farm Number" value="123" />
                                <Labeled label="Suburb" value="Cedar" />
                                <Labeled label="Area Code" value="1234" />
                                <Labeled label="City/Work" value="Johannesburg" />
                                <Labeled label="Province" value="Gauteng" />
                                <Labeled label="Country" value="South Africa" />
                              </div>
                            </div>

                            <div>
                              <div className="text-sm font-bold text-[#3F842E] mb-3">Post Box</div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <Labeled label="Postal Number" value="4965" />
                                <Labeled label="Post Office" value="Spar Post Office" />
                                <Labeled label="Postal Code" value="4455" />
                                <Labeled label="City/Work" value="Johannesburg" />
                                <Labeled label="Province" value="Gauteng" />
                                <Labeled label="Country" value="South Africa" />
                              </div>
                            </div>
                          </div>
                        </Panel>
                      );
                    }

                    // Permit Holder (similar layout)
                    if (s.key === "permit-holder") {
                      return (
                        <Panel
                          header={
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center gap-3">
                                <span className="text-sm font-semibold">{s.title}</span>
                              </div>
                              <div className="text-xs text-gray-500" />
                            </div>
                          }
                          key={s.key}
                          className="!border-t !border-gray-100"
                        >
                          <div className="p-4 text-sm text-gray-700 space-y-6">
                            <div>
                              <div className="text-sm font-bold text-[#3F842E] mb-3">Personal Details</div>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <Labeled label="Title" value="MRS" />
                                <Labeled label="Initial(s)" value="JF" />
                                <Labeled label="Surname" value="Hart" />
                                <div className="sm:col-span-3">
                                  <Labeled label="Full Name(s)" value="Jackie Felicia Hart" />
                                </div>
                                <Labeled label="Preferred Name" value="Jackie" />
                                <Labeled label="Identity Type" value="Passport" />
                                <Labeled label="ID/Passport Number" value="N12345678" />
                              </div>
                            </div>

                            <div>
                              <div className="text-sm font-bold text-[#3F842E] mb-3">Contact Details</div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <Labeled label="Preferred Contact Method" value="Email" />
                                <Labeled label="Email" value="jackie.hart@email.com" />
                                <Labeled label="Mobile" value="0825554499" />
                                <Labeled label="Alternative Mobile" value="0820001111" />
                                <Labeled label="Work" value="0114443322" />
                                <Labeled label="Telephone (Home)" value="0678899000" />
                              </div>
                            </div>

                            <div>
                              <div className="text-sm font-bold text-[#3F842E] mb-3">Address Details</div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <Labeled label="Residential Address type" value="Suburban" />
                                <Labeled label="Street Address" value="12 Rose Avenue" />
                                <Labeled label="Suburb" value="Greenfield" />
                                <Labeled label="Area Code" value="2001" />
                                <Labeled label="City/Work" value="Pretoria" />
                                <Labeled label="Province" value="Gauteng" />
                                <Labeled label="Country" value="South Africa" />
                              </div>
                            </div>

                            <div>
                              <div className="text-sm font-bold text-[#3F842E] mb-3">Post Box</div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <Labeled label="Postal Number" value="3321" />
                                <Labeled label="Post Office" value="Central Post" />
                                <Labeled label="Postal Code" value="0001" />
                                <Labeled label="City/Work" value="Pretoria" />
                                <Labeled label="Province" value="Gauteng" />
                                <Labeled label="Country" value="South Africa" />
                              </div>
                            </div>
                          </div>
                        </Panel>
                      );
                    }

                    // Validity Period
                    if (s.key === "validity") {
                      return (
                        <Panel
                          header={
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center gap-3">
                                <span className="text-sm font-semibold">{s.title}</span>
                              </div>
                              <div className="text-xs text-gray-500" />
                            </div>
                          }
                          key={s.key}
                          className="!border-t !border-gray-100"
                        >
                          <div className="p-4 text-sm text-gray-700 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <Labeled label="Validity Period" value="01 Jan 2025 — 31 Dec 2025" />
                              <Labeled label="User" value="Charlotte Gumba" />
                              <Labeled label="Reason" value="Annual renewal" />
                              <Labeled label="Date" value="2025-09-01" />
                            </div>
                          </div>
                        </Panel>
                      );
                    }

                    // Time Frame
                    if (s.key === "time-frame") {
                      return (
                        <Panel
                          header={
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center gap-3">
                                <span className="text-sm font-semibold">{s.title}</span>
                              </div>
                              <div className="text-xs text-gray-500" />
                            </div>
                          }
                          key={s.key}
                          className="!border-t !border-gray-100"
                        >
                          <div className="p-4 text-sm text-gray-700 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <Labeled label="Valid From" value="2025-09-01" />
                              <Labeled label="Valid To" value="2025-09-30" />
                              <Labeled label="User" value="Charlotte Gumba" />
                              <Labeled label="Reason" value="Seasonal permit" />
                              <Labeled label="Date" value="2025-08-25" />
                            </div>
                          </div>
                        </Panel>
                      );
                    }

                    // Activities
                    if (s.key === "activities") {
                      return (
                        <Panel
                          header={
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center gap-3">
                                <span className="text-sm font-semibold">{s.title}</span>
                              </div>
                              <div className="text-xs text-gray-500" />
                            </div>
                          }
                          key={s.key}
                          className="!border-t !border-gray-100"
                        >
                          <div className="p-4 text-sm text-gray-700 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <Labeled label="Name" value="Hunting" />
                              <Labeled label="Description" value="Receive & Distribute" />
                              <Labeled label="User" value="Naledi East" />
                              <Labeled label="Reason" value="Operational requirement" />
                              <Labeled label="Date" value="2025-07-12" />
                            </div>
                          </div>
                        </Panel>
                      );
                    }

                    // Methods
                    if (s.key === "methods") {
                      return (
                        <Panel
                          header={
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center gap-3">
                                <span className="text-sm font-semibold">{s.title}</span>
                              </div>
                              <div className="text-xs text-gray-500" />
                            </div>
                          }
                          key={s.key}
                          className="!border-t !border-gray-100"
                        >
                          <div className="p-4 text-sm text-gray-700 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <Labeled label="Name" value="Firearm" />
                              <Labeled label="Description" value="Use of firearm for humane dispatch" />
                              <Labeled label="User" value="Field Officer" />
                              <Labeled label="Reason" value="Safety protocol" />
                              <Labeled label="Date" value="2025-07-10" />
                            </div>
                          </div>
                        </Panel>
                      );
                    }

                    // Species (two sub-headings)
                    if (s.key === "species") {
                      return (
                        <Panel
                          header={
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center gap-3">
                                <span className="text-sm font-semibold">{s.title}</span>
                              </div>
                              <div className="text-xs text-gray-500" />
                            </div>
                          }
                          key={s.key}
                          className="!border-t !border-gray-100"
                        >
                          <div className="p-4 text-sm text-gray-700 space-y-6">
                            <div>
                              <div className="text-sm font-bold text-[#3F842E] mb-3">Specie details</div>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <Labeled label="Common Name" value="Lion" />
                                <Labeled label="Scientific Name" value="Panthera leo" />
                                <Labeled label="Gender" value="Male" />
                                <Labeled label="Viral Status" value="Negative" />
                                <Labeled label="Number" value="1" />
                                <Labeled label="Marking" value="Collar #A123" />
                              </div>
                            </div>

                            <div>
                              <div className="text-sm font-bold text-[#3F842E] mb-3">Draft Actions</div>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <Labeled label="User" value="Charlotte Gumba" />
                                <Labeled label="Reason" value="Approve draft" />
                                <Labeled label="Date" value="2025-08-30" />
                              </div>
                            </div>
                          </div>
                        </Panel>
                      );
                    }

                    // Foreigners
                    if (s.key === "foreigners") {
                      return (
                        <Panel
                          header={
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center gap-3">
                                <span className="text-sm font-semibold">{s.title}</span>
                              </div>
                              <div className="text-xs text-gray-500" />
                            </div>
                          }
                          key={s.key}
                          className="!border-t !border-gray-100"
                        >
                          <div className="p-4 text-sm text-gray-700 space-y-6">
                            {/* Personal Details */}
                            <div>
                              <div className="text-sm font-bold text-[#3F842E] mb-3">Personal Details</div>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <Labeled label="Arrival Date" value="2025-07-01" />
                                <Labeled label="Departure Date" value="2025-07-30" />
                                <Labeled label="Initials" value="A.B." />
                                <Labeled label="Name" value="Alice" />
                                <Labeled label="Surname" value="Brown" />
                                <Labeled label="Preferred Name" value="Ali" />
                                <Labeled label="ID Number" value="—" />
                                <Labeled label="Passport" value="P1234567" />
                                <Labeled label="Tel Home" value="0123456789" />
                                <Labeled label="Tel Work" value="0119876543" />
                                <Labeled label="Mobile" value="0721234567" />
                                <Labeled label="Alternative Mobile" value="0737654321" />
                                <Labeled label="Email" value="alice.brown@foreign.com" />
                                <Labeled label="Website" value="www.alice.example" />
                              </div>
                            </div>

                            {/* Address Details */}
                            <div>
                              <div className="text-sm font-bold text-[#3F842E] mb-3">Address Details</div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <Labeled label="Residential address type" value="Hotel" />
                                <Labeled label="From Number" value="12" />
                                <Labeled label="From Name" value="Ocean Drive" />
                                <Labeled label="Suburb" value="Sea View" />
                                <Labeled label="Area Code" value="4001" />
                                <Labeled label="City/Town" value="Cape Town" />
                                <Labeled label="Province" value="Western Cape" />
                                <Labeled label="Country" value="United Kingdom" />
                              </div>
                            </div>

                            {/* Post Box */}
                            <div>
                              <div className="text-sm font-bold text-[#3F842E] mb-3">Post Box</div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <Labeled label="Postal Number" value="7000" />
                                <Labeled label="Post Office" value="Cape Town Central" />
                                <Labeled label="Postal Code" value="8000" />
                                <Labeled label="City/Town" value="Cape Town" />
                                <Labeled label="Province" value="Western Cape" />
                                <Labeled label="Country" value="United Kingdom" />
                              </div>
                            </div>

                            {/* Documents */}
                            <div>
                              <div className="text-sm font-bold text-[#3F842E] mb-3">Documents</div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <Labeled label="Identity document" value="Passport (P1234567)" />
                                <Labeled label="Proof of Address" value="Utility bill" />
                              </div>
                            </div>

                            {/* Draft Actions */}
                            <div>
                              <div className="text-sm font-bold text-[#3F842E] mb-3">Draft Actions</div>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <Labeled label="User" value="System Admin" />
                                <Labeled label="Reason" value="Add foreign delegate" />
                                <Labeled label="Date" value="2025-06-15" />
                              </div>
                            </div>
                          </div>
                        </Panel>
                      );
                    }

                    // Other Parties Involved
                    if (s.key === "other-parties") {
                      return (
                        <Panel
                          header={
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center gap-3">
                                <span className="text-sm font-semibold">{s.title}</span>
                              </div>
                              <div className="text-xs text-gray-500" />
                            </div>
                          }
                          key={s.key}
                          className="!border-t !border-gray-100"
                        >
                          <div className="p-4 text-sm text-gray-700 space-y-6">
                            {/* Personal Details */}
                            <div>
                              <div className="text-sm font-bold text-[#3F842E] mb-3">Personal Details</div>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <Labeled label="Involvement" value="Witness" />
                                <Labeled label="Initials" value="J.D." />
                                <Labeled label="Name" value="John" />
                                <Labeled label="Surname" value="Doe" />
                                <Labeled label="Preferred Name" value="Johnny" />
                                <Labeled label="ID Number" value="7812..." />
                                <Labeled label="Passport" value="—" />
                                <Labeled label="Tel Home" value="0111111111" />
                                <Labeled label="Tel Work" value="0112222222" />
                                <Labeled label="Mobile" value="0729998888" />
                                <Labeled label="Alternative Mobile" value="0730007777" />
                                <Labeled label="Email" value="john.doe@example.com" />
                                <Labeled label="Website" value="—" />
                              </div>
                            </div>

                            {/* Address Details */}
                            <div>
                              <div className="text-sm font-bold text-[#3F842E] mb-3">Address Details</div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <Labeled label="Residential address type" value="Farm" />
                                <Labeled label="Farm number" value="123" />
                                <Labeled label="Farm name" value="Hart Farm" />
                                <Labeled label="Suburb" value="Cedar" />
                                <Labeled label="Area Code" value="1234" />
                                <Labeled label="City/Town" value="Johannesburg" />
                                <Labeled label="Province" value="Gauteng" />
                                <Labeled label="Country" value="South Africa" />
                              </div>
                            </div>

                            {/* Post Box */}
                            <div>
                              <div className="text-sm font-bold text-[#3F842E] mb-3">Post Box</div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <Labeled label="Postal number" value="4965" />
                                <Labeled label="Post office" value="Spar Post Office" />
                                <Labeled label="Postal code" value="4455" />
                                <Labeled label="City/Town" value="Johannesburg" />
                                <Labeled label="Province" value="Gauteng" />
                                <Labeled label="Country" value="South Africa" />
                              </div>
                            </div>

                            {/* Documents */}
                            <div>
                              <div className="text-sm font-bold text-[#3F842E] mb-3">Documents</div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <Labeled label="Identity document" value="ID Card" />
                                <Labeled label="Proof of residence" value="Utility bill" />
                              </div>
                            </div>

                            {/* Draft Actions */}
                            <div>
                              <div className="text-sm font-bold text-[#3F842E] mb-3">Draft Actions</div>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <Labeled label="User" value="System Admin" />
                                <Labeled label="Reason" value="Add party" />
                                <Labeled label="Date" value="2025-06-30" />
                              </div>
                            </div>
                          </div>
                        </Panel>
                      );
                    }

                    // Affected Parties
                    if (s.key === "affected-parties") {
                      return (
                        <Panel
                          header={
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center gap-3">
                                <span className="text-sm font-semibold">{s.title}</span>
                              </div>
                              <div className="text-xs text-gray-500" />
                            </div>
                          }
                          key={s.key}
                          className="!border-t !border-gray-100"
                        >
                          <div className="p-4 text-sm text-gray-700 space-y-6">
                            <div>
                              <div className="text-sm font-bold text-[#3F842E] mb-3">Personal Details</div>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <Labeled label="Involvement" value="Owner" />
                                <Labeled label="Initials" value="J.F." />
                                <Labeled label="Name" value="Jackie" />
                                <Labeled label="Surname" value="Hart" />
                                <Labeled label="Preferred Name" value="Jackie" />
                                <Labeled label="ID Number" value="N123..." />
                                <Labeled label="Passport" value="—" />
                                <Labeled label="Tel Home" value="0114443322" />
                                <Labeled label="Tel Work" value="0114443322" />
                                <Labeled label="Mobile" value="0825554499" />
                                <Labeled label="Alternative Mobile" value="0820001111" />
                                <Labeled label="Email" value="jackie.hart@email.com" />
                                <Labeled label="Website" value="—" />
                              </div>
                            </div>

                            <div>
                              <div className="text-sm font-bold text-[#3F842E] mb-3">Address Details</div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <Labeled label="Residential Address Type" value="Farm" />
                                <Labeled label="Farm Number" value="123" />
                                <Labeled label="Farm Name" value="Hart Farm" />
                                <Labeled label="Suburb" value="Cedar" />
                                <Labeled label="Area Code" value="1234" />
                                <Labeled label="City/Town" value="Johannesburg" />
                                <Labeled label="Province" value="Gauteng" />
                                <Labeled label="Country" value="South Africa" />
                              </div>
                            </div>

                            <div>
                              <div className="text-sm font-bold text-[#3F842E] mb-3">Post Box</div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <Labeled label="Postal Number" value="4965" />
                                <Labeled label="Post Office" value="Spar Post Office" />
                                <Labeled label="Postal Code" value="4455" />
                                <Labeled label="City/Town" value="Johannesburg" />
                                <Labeled label="Province" value="Gauteng" />
                                <Labeled label="Country" value="South Africa" />
                              </div>
                            </div>

                            <div>
                              <div className="text-sm font-bold text-[#3F842E] mb-3">Documents</div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <Labeled label="Identity Document" value="ID Card" />
                                <Labeled label="Proof of Residence" value="Utility bill" />
                              </div>
                            </div>

                            <div>
                              <div className="text-sm font-bold text-[#3F842E] mb-3">Draft Actions</div>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <Labeled label="User" value="System Admin" />
                                <Labeled label="Reason" value="Record affected party" />
                                <Labeled label="Date" value="2025-07-01" />
                              </div>
                            </div>
                          </div>
                        </Panel>
                      );
                    }

                    // Facilities
                    if (s.key === "facilities") {
                      return (
                        <Panel
                          header={
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center gap-3">
                                <span className="text-sm font-semibold">{s.title}</span>
                              </div>
                              <div className="text-xs text-gray-500" />
                            </div>
                          }
                          key={s.key}
                          className="!border-t !border-gray-100"
                        >
                          <div className="p-4 text-sm text-gray-700 space-y-6">
                            <div>
                              <div className="text-sm font-bold text-[#3F842E] mb-3">Facility Details</div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <Labeled label="Name" value="Research Centre" />
                                <Labeled label="Residential Address Type" value="Farm" />
                                <Labeled label="Farm Number" value="123" />
                                <Labeled label="Farm Name" value="Hart Farm" />
                                <Labeled label="Suburb" value="Cedar" />
                                <Labeled label="Area Code" value="1234" />
                                <Labeled label="City/Town" value="Johannesburg" />
                                <Labeled label="Province" value="Gauteng" />
                                <Labeled label="Country" value="South Africa" />
                              </div>
                            </div>

                            <div>
                              <div className="text-sm font-bold text-[#3F842E] mb-3">Owner</div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <Labeled label="Full name" value="Owner Name" />
                                <Labeled label="Surname" value="Owner Surname" />
                              </div>
                            </div>

                            <div>
                              <div className="text-sm font-bold text-[#3F842E] mb-3">Draft Actions</div>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <Labeled label="User" value="System Admin" />
                                <Labeled label="Reason" value="Add facility" />
                                <Labeled label="Date" value="2025-05-10" />
                              </div>
                            </div>
                          </div>
                        </Panel>
                      );
                    }

                    // Properties
                    if (s.key === "properties") {
                      return (
                        <Panel
                          header={
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center gap-3">
                                <span className="text-sm font-semibold">{s.title}</span>
                              </div>
                              <div className="text-xs text-gray-500" />
                            </div>
                          }
                          key={s.key}
                          className="!border-t !border-gray-100"
                        >
                          <div className="p-4 text-sm text-gray-700 space-y-6">
                            <div>
                              <div className="text-sm font-bold text-[#3F842E] mb-3">Facility Details</div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <Labeled label="Name" value="Research Centre" />
                                <Labeled label="Title Deed No" value="TD-12345" />
                                <Labeled label="Size / Hectares" value="500" />
                                <Labeled label="Residential Address Type" value="Farm" />
                                <Labeled label="Farm Number" value="123" />
                                <Labeled label="Farm Name" value="Hart Farm" />
                                <Labeled label="Suburb" value="Cedar" />
                                <Labeled label="Area Code" value="1234" />
                                <Labeled label="City/Town" value="Johannesburg" />
                                <Labeled label="Province" value="Gauteng" />
                                <Labeled label="Country" value="South Africa" />
                              </div>
                            </div>

                            <div>
                              <div className="text-sm font-bold text-[#3F842E] mb-3">Owner</div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <Labeled label="Full name" value="Owner Name" />
                                <Labeled label="Surname" value="Owner Surname" />
                              </div>
                            </div>

                            <div>
                              <div className="text-sm font-bold text-[#3F842E] mb-3">Draft Actions</div>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <Labeled label="User" value="System Admin" />
                                <Labeled label="Reason" value="Add property" />
                                <Labeled label="Date" value="2025-04-22" />
                              </div>
                            </div>
                          </div>
                        </Panel>
                      );
                    }

                    // Hunters
                    if (s.key === "hunters") {
                      return (
                        <Panel
                          header={
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center gap-3">
                                <span className="text-sm font-semibold">{s.title}</span>
                              </div>
                              <div className="text-xs text-gray-500" />
                            </div>
                          }
                          key={s.key}
                          className="!border-t !border-gray-100"
                        >
                          <div className="p-4 text-sm text-gray-700 space-y-4">
                            <div>
                              <div className="text-sm font-bold text-[#3F842E] mb-3">Pro Hunter Details</div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <Labeled label="Name" value="Luke" />
                                <Labeled label="Surname" value="Smith" />
                                <Labeled label="PH Number" value="PH-001" />
                                <Labeled label="Mobile Number" value="0721112222" />
                                <Labeled label="Tel Number" value="0113334444" />
                              </div>
                            </div>

                            <div>
                              <div className="text-sm font-bold text-[#3F842E] mb-3">Draft Actions</div>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <Labeled label="User" value="System Admin" />
                                <Labeled label="Reason" value="Add hunter" />
                                <Labeled label="Date" value="2025-03-15" />
                              </div>
                            </div>
                          </div>
                        </Panel>
                      );
                    }

                    // Outfitters
                    if (s.key === "outfitters") {
                      return (
                        <Panel
                          header={
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center gap-3">
                                <span className="text-sm font-semibold">{s.title}</span>
                              </div>
                              <div className="text-xs text-gray-500" />
                            </div>
                          }
                          key={s.key}
                          className="!border-t !border-gray-100"
                        >
                          <div className="p-4 text-sm text-gray-700 space-y-4">
                            <div>
                              <div className="text-sm font-bold text-[#3F842E] mb-3">Outfitter Details</div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <Labeled label="Name" value="Outfitter Co" />
                                <Labeled label="Surname" value="N/A" />
                                <Labeled label="HC Number" value="HC-777" />
                                <Labeled label="Mobile Number" value="0725556666" />
                                <Labeled label="Tel Number" value="0117778888" />
                              </div>
                            </div>

                            <div>
                              <div className="text-sm font-bold text-[#3F842E] mb-3">Draft Actions</div>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <Labeled label="User" value="System Admin" />
                                <Labeled label="Reason" value="Add outfitter" />
                                <Labeled label="Date" value="2025-02-12" />
                              </div>
                            </div>
                          </div>
                        </Panel>
                      );
                    }

                    // Transport From
                    if (s.key === "transport-from") {
                      return (
                        <Panel
                          header={
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center gap-3">
                                <span className="text-sm font-semibold">{s.title}</span>
                              </div>
                              <div className="text-xs text-gray-500" />
                            </div>
                          }
                          key={s.key}
                          className="!border-t !border-gray-100"
                        >
                          <div className="p-4 text-sm text-gray-700 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <Labeled label="Property Name" value="Hart Farm" />
                              <Labeled label="Owner Name and Surname" value="Jackie Hart" />
                              <Labeled label="Port of Exit" value="OR Tambo" />
                              <Labeled label="Property Number" value="123" />
                              <Labeled label="Title Deed Number" value="TD-12345" />
                              <Labeled label="Size/ Hectares" value="500" />
                              <Labeled label="Farm / Street No" value="123" />
                              <Labeled label="Building Name" value="Main Lodge" />
                              <Labeled label="Suburb" value="Cedar" />
                              <Labeled label="Area Code" value="1234" />
                              <Labeled label="City / Town" value="Johannesburg" />
                              <Labeled label="District / Region" value="Region 1" />
                              <Labeled label="State / Province" value="Gauteng" />
                              <Labeled label="Country" value="South Africa" />
                            </div>
                          </div>
                        </Panel>
                      );
                    }

                    // Transport To
                    if (s.key === "transport-to") {
                      return (
                        <Panel
                          header={
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center gap-3">
                                <span className="text-sm font-semibold">{s.title}</span>
                              </div>
                              <div className="text-xs text-gray-500" />
                            </div>
                          }
                          key={s.key}
                          className="!border-t !border-gray-100"
                        >
                          <div className="p-4 text-sm text-gray-700 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <Labeled label="Property Name" value="Destination Farm" />
                              <Labeled label="Owner Name and Surname" value="Dest Owner" />
                              <Labeled label="Port of Exit" value="OR Tambo" />
                              <Labeled label="Property Number" value="999" />
                              <Labeled label="Title Deed Number" value="TD-99999" />
                              <Labeled label="Size/ Hectares" value="300" />
                              <Labeled label="Farm / Street No" value="999" />
                              <Labeled label="Building Name" value="Reception" />
                              <Labeled label="Suburb" value="Green" />
                              <Labeled label="Area Code" value="4321" />
                              <Labeled label="City / Town" value="Pretoria" />
                              <Labeled label="District / Region" value="Region X" />
                              <Labeled label="State / Province" value="Gauteng" />
                              <Labeled label="Country" value="South Africa" />
                            </div>
                          </div>
                        </Panel>
                      );
                    }

                    // Supporting Documents
                    if (s.key === "supporting-documents") {
                      return (
                        <Panel
                          header={
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center gap-3">
                                <span className="text-sm font-semibold">{s.title}</span>
                              </div>
                              <div className="text-xs text-gray-500" />
                            </div>
                          }
                          key={s.key}
                          className="!border-t !border-gray-100"
                        >
                          <div className="p-4 text-sm text-gray-700">
                            {/* 3-column layout - filename / tag / verified */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                              <div>
                                <div className="text-sm font-bold text-[#3F842E] mb-2">File Name</div>
                                <div className="text-sm">ID Jack.pdf</div>
                                <div className="text-sm mt-2">Proofofresidence.pdf</div>
                                <div className="text-sm mt-2">permit.pdf</div>
                              </div>

                              <div>
                                <div className="text-sm font-bold text-[#3F842E] mb-2">Tag / Verification</div>
                                <div className="text-sm">ID</div>
                                <div className="text-sm mt-2">Proof of Residence</div>
                                <div className="text-sm mt-2">Permit</div>
                              </div>

                              <div>
                                <div className="text-sm font-bold text-[#3F842E] mb-2">Verified</div>
                                <div className="text-sm">Verified by Jomo Ngcobo 12/09/2025</div>
                                <div className="text-sm mt-2">Verified by Jomo Ngcobo 12/09/2025</div>
                                <div className="text-sm mt-2">Verified by Jomo Ngcobo 12/09/2025</div>
                              </div>
                            </div>

                            <div>
                              <div className="text-sm font-bold text-[#3F842E] mb-3">Draft Actions</div>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <Labeled label="User" value="Verifier" />
                                <Labeled label="Reason" value="Document check" />
                                <Labeled label="Date" value="2025-09-12" />
                              </div>
                            </div>
                          </div>
                        </Panel>
                      );
                    }

                    // Permit Attachments
                    if (s.key === "permit-attachments") {
                      return (
                        <Panel
                          header={
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center gap-3">
                                <span className="text-sm font-semibold">{s.title}</span>
                              </div>
                              <div className="text-xs text-gray-500" />
                            </div>
                          }
                          key={s.key}
                          className="!border-t !border-gray-100"
                        >
                          <div className="p-4 text-sm text-gray-700">
                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                              <div className="font-semibold">File Name</div>
                              <div className="font-semibold">User</div>
                              <div className="font-semibold">Reason</div>
                              <div className="font-semibold">Date</div>

                              <div className="col-span-1">permit.pdf</div>
                              <div className="col-span-1">Jack</div>
                              <div className="col-span-1">Initial upload</div>
                              <div className="col-span-1">2025-09-01</div>
                            </div>
                          </div>
                        </Panel>
                      );
                    }

                    // General & Standard Conditions
                    if (s.key === "general-conditions") {
                      return (
                        <Panel
                          header={
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center gap-3">
                                <span className="text-sm font-semibold">{s.title}</span>
                              </div>
                              <div className="text-xs text-gray-500" />
                            </div>
                          }
                          key={s.key}
                          className="!border-t !border-gray-100"
                        >
                          <div className="p-4 text-sm text-gray-700">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center mb-3">
                              <div className="font-semibold">Name</div>
                              <div className="font-semibold">Description</div>
                              <div className="font-semibold" />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                              <div>General Conditions - All Permits</div>
                              <div>Signed</div>
                              <div>
                                <Button type="primary" style={{ background: "#3F842E", borderColor: "#3F842E" }}>
                                  Preview
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Panel>
                      );
                    }

                    // Special Conditions
                    if (s.key === "special-conditions") {
                      return (
                        <Panel
                          header={
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center gap-3">
                                <span className="text-sm font-semibold">{s.title}</span>
                              </div>
                              <div className="text-xs text-gray-500" />
                            </div>
                          }
                          key={s.key}
                          className="!border-t !border-gray-100"
                        >
                          <div className="p-4 text-sm text-gray-700">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <Labeled label="Name" value="Special Condition A" />
                              <Labeled label="Description" value="Only allowed during specified period" />
                              <Labeled label="User" value="Admin" />
                              <Labeled label="Reason" value="Safety" />
                              <Labeled label="Date" value="2025-07-20" />
                            </div>
                          </div>
                        </Panel>
                      );
                    }

                    // default for any other panel (fallback content)
                    return (
                      <Panel
                        header={
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-semibold">{s.title}</span>
                            </div>
                            <div className="text-xs text-gray-500" />
                          </div>
                        }
                        key={s.key}
                        className="!border-t !border-gray-100"
                      >
                        <div className="p-3 text-sm text-gray-700">{s.content}</div>
                      </Panel>
                    );
                  })}

                  {!app && (
                    <Panel header={<span className="text-sm font-semibold">Loading...</span>} key="loading">
                      <div className="p-3 text-sm text-gray-500">Loading application...</div>
                    </Panel>
                  )}
                </Collapse>
              </div>
            ) : activeTab === "My Tasks" ? (
              <MyTasksPanel />
            ) : (
              <div className="space-y-4">{renderTabPlaceholder(activeTab)}</div>
            )}
          </div>
        </div>

        {/* Right column - Application Info */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-md p-5 shadow-[0_8px_20px_rgba(0,0,0,0.06)] border border-gray-200" style={{ borderRadius: 8 }}>
            <h3 className="text-lg font-bold mb-3">Application Info</h3>

            <div className="mb-4">
              <div className="text-xs text-gray-500">UDR Number</div>
              <div className="font-semibold text-[#3F842E] mt-1">{app?.udrNumber ?? "—"}</div>
            </div>

            <Divider className="my-2" />

            <div className="mb-3">
              <div className="text-sm font-semibold">Workflow Actions</div>
              <div className="text-xs text-gray-500">Move This Application To The Next Step</div>
            </div>

            <div className="mb-4">
              <div className="text-xs text-gray-500 mb-2">Send to another division</div>
              <Select
                placeholder="Select division"
                value={division}
                onChange={(val) => setDivision(val)}
                style={{ width: "100%" }}
                size="middle"
                options={[
                  { label: "Dr Kenneth Kaunda District", value: "kenneth" },
                  { label: "Dr Ruth Segomotsi Mompati", value: "ruth" },
                ]}
              />
              <Button type="primary" block className="mt-3" onClick={handleSendForward}>
                Send Forward
              </Button>
            </div>

            <div className="mb-4">
              <div className="text-xs text-gray-500 mb-2">Send back to previous Processing Step</div>
              <Select
                placeholder="Select step"
                value={step}
                onChange={(val) => setStep(val)}
                style={{ width: "100%" }}
                size="middle"
                options={[
                  { label: "Step 1 - Intake", value: "step1" },
                  { label: "Step 2 - Review", value: "step2" },
                ]}
              />
              <Button block className="mt-3" onClick={handleSendBack} style={{ background: "#3F842E", color: "white" }}>
                Send Back
              </Button>
            </div>

            <div className="mt-4">
              <Button block type="default" onClick={handlePreview}>
                Preview Draft
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// helper placeholder renderer (kept below)
function renderTabPlaceholder(t: TabKey) {
  return (
    <div className="bg-white rounded-md border border-gray-200 shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{t}</h3>
      <p className="text-sm text-gray-600">Placeholder content for <strong>{t}</strong>. Replace with real layout later.</p>
    </div>
  );
}
