// src/pages/ApplicationDetailPage.tsx
import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { Collapse, Select, Button, Divider } from "antd";
import { DownOutlined } from "@ant-design/icons";

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
    { key: "applicant-details", title: "Applicant Details", content: null }, // special render
    { key: "permit-holder", title: "Permit Holder Details", content: null }, // special render
    { key: "validity", title: "Validity Period", content: null },
    { key: "time-frame", title: "Time Frame", content: null },
    { key: "activities", title: "Activities", content: null },
    { key: "methods", title: "Methods", content: null },
    { key: "species", title: "Species", content: null },
    { key: "foreigners", title: "Foreigners", content: null },
    { key: "other-parties", title: "Other Parties Involved", content: <div className="text-sm text-gray-700">Owner: John Doe</div> },
    { key: "affected-parties", title: "Affected Parties", content: <div className="text-sm text-gray-700">No affected parties recorded</div> },
    { key: "facilities", title: "Facilities", content: <div className="text-sm text-gray-700">Facilities details here</div> },
    { key: "properties", title: "Properties", content: <div className="text-sm text-gray-700">Properties details here</div> },
    { key: "hunters", title: "Hunters", content: <div className="text-sm text-gray-700">Hunters details here</div> },
    { key: "outfitters", title: "Outfitters", content: <div className="text-sm text-gray-700">Outfitters details here</div> },
    { key: "transport-from", title: "Transport From", content: <div className="text-sm text-gray-700">Transport from details</div> },
    { key: "transport-to", title: "Transport To", content: <div className="text-sm text-gray-700">Transport to details</div> },
    { key: "supporting-docs", title: "Supporting Documents", content: <div className="text-sm text-gray-700">Supporting documents list</div> },
    { key: "permit-attachments", title: "Permit Attachments (PDFs Preferred)", content: <div className="text-sm text-gray-700">PDF attachments here</div> },
    { key: "fees", title: "Fees", content: <div className="text-sm text-gray-700">Fees summary</div> },
    { key: "payments", title: "Payments", content: <div className="text-sm text-gray-700">Payments history</div> },
    { key: "general-conditions", title: "General & Standard Conditions", content: <div className="text-sm text-gray-700">General conditions content</div> },
    { key: "special-conditions", title: "Special Conditions", content: <div className="text-sm text-gray-700">Special conditions content</div> },
  ],
};

function fetchApplicationDetail(id: string): Promise<AppDetail> {
  // In future: call your API and map fields into sections
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

export default function ApplicationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [app, setApp] = React.useState<AppDetail | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [division, setDivision] = React.useState<string | undefined>(undefined);
  const [step, setStep] = React.useState<string | undefined>(undefined);

  // tab state: default to Application
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

  // handlers (replace with real API calls)
  const handleSendForward = () => alert(`Send Forward to division: ${division ?? "none selected"}`);
  const handleSendBack = () => alert(`Send Back to step: ${step ?? "none selected"}`);
  const handlePreview = () => alert("Preview Draft (placeholder)");

  // placeholders for other tabs
  const renderTabPlaceholder = (t: TabKey) => (
    <div className="bg-white rounded-md border border-gray-200 shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{t}</h3>
      <p className="text-sm text-gray-600">
        Placeholder content for <strong>{t}</strong>. Replace with real layout later.
      </p>
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
          {/* Tabs row */}
          <div className="flex flex-wrap items-center gap-3 text-sm mb-3">
            {(["Application", "My Tasks", "Applicant Dialog", "Official Dialog", "Participants", "Summary"] as TabKey[]).map(
              (t) => {
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
              }
            )}
          </div>

          {/* Content area */}
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
                    // Applicant Details panel (special render)
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
                            {/* Personal Details */}
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

                            {/* Contact Details */}
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

                            {/* Address Details */}
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

                            {/* Post Box */}
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

                    // Permit Holder panel (rendered similarly to applicant-details but with its own mock values)
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
                            {/* Personal Details (Permit Holder) */}
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

                            {/* Contact Details (Permit Holder) */}
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

                            {/* Address Details (Permit Holder) */}
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

                            {/* Post Box (Permit Holder) */}
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

                    // Validity Period panel
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

                    // Time Frame panel
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

                    // Activities panel
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

                    // Methods panel
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

                    // Species panel (with two sub-headings)
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
                            {/* Specie details sub-heading */}
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

                            {/* Draft Actions sub-heading */}
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

                    // Foreigners panel with requested subsections
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

                    // default for other sections (placeholders already set in MOCK_APP)
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
            ) : (
              // placeholder for other tabs
              <div className="space-y-4">{renderTabPlaceholder(activeTab)}</div>
            )}
          </div>
        </div>

        {/* Right: Application Info column (unchanged) */}
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
