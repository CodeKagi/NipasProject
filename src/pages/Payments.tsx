import React from "react";
import forgotPasswordLogo from "../assets/forgotPasswordLogo.svg";

type PaymentItem = {
    id: string;
    applicant: string;
    type: string;
    status: string;
};

export default function Payments() {
    // mock items to display – backend can replace with API data
    const items: PaymentItem[] = [
        { id: "4518", applicant: "Thabo Jacob", type: "Hunt DCA - Lion", status: "Pending" },
        { id: "9628", applicant: "Marie Peterson", type: "Hunt Dangerous Game", status: "Pending" },
    ];

    // mock payment summary – also easy to replace with real values
    const paymentSummary = {
        reference: "#3088824",
        total: 3470,
        currency: "ZAR",
        email: "zanele@example.com",
    };

    type MethodKey = "instantEft" | "capitecPay";
    const [selectedMethod, setSelectedMethod] = React.useState<MethodKey>("instantEft");

    const paymentMethods: { key: MethodKey; label: string; badge?: string }[] = [
        { key: "instantEft", label: "Instant EFT", badge: "InstantEFT" },
        { key: "capitecPay", label: "Capitec Pay", badge: "Capitec Pay" },
    ];

    const handleCancel = () => {
        // TODO: backend dev can plug in cancel endpoint here
        console.log("Cancel transaction clicked");
    };

    const handleContinue = () => {
        // TODO: backend dev can call PayFast / payment gateway init here
        console.log("Proceed with method:", selectedMethod);
    };

    const handleViewItems = () => {
        alert(
            items
                .map((i) => `${i.id} – ${i.applicant} – ${i.type} (${i.status})`)
                .join("\n")
        );
    };

    return (
        <div className="w-full">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Payment</h1>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm px-10 py-8">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
        
                        <div className="leading-tight">

                            <div
                                className="flex justify-center transition-all duration-300"
                            >
                                <img
                                    src={forgotPasswordLogo}
                                    alt="Logo"
                                    className="h-16 w-auto"

                                />
                            </div>
                        </div>

                    </div>

                    <div className="text-right">
                        <div className="text-xs text-gray-500">Secured and powered by</div>
                        <div className="text-lg font-bold text-gray-800">
                            payfast <span className="text-xs font-normal text-gray-500">by network</span>
                        </div>
                    </div>
                </div>

                {/* Middle content: two-column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
                    {/* Left: payment summary */}
                    <div className="bg-gray-50 border border-gray-200 rounded-xl px-6 py-5 flex flex-col justify-between min-h-[190px]">
                        {/* Reference + amount */}
                        <div className="space-y-4">
                            <div className="text-sm font-semibold text-gray-900">{paymentSummary.reference}</div>

                            <div className="grid grid-cols-2 gap-4 text-xs">
                                <div className="border border-gray-200 rounded-md bg-white px-3 py-2">
                                    <div className="text-[11px] uppercase tracking-wide text-gray-500">
                                        Payment total
                                    </div>
                                    <div className="mt-1 text-sm font-semibold">
                                        {paymentSummary.currency} {paymentSummary.total.toLocaleString()}
                                    </div>
                                </div>

                                <div className="border border-gray-200 rounded-md bg-white px-3 py-2">
                                    <div className="text-[11px] uppercase tracking-wide text-gray-500">
                                        Status
                                    </div>
                                    <div className="mt-1 text-sm font-semibold">••••</div>
                                </div>
                            </div>
                        </div>

                        {/* Transacting info + link */}
                        <div className="mt-6 text-xs text-gray-600 flex items-center justify-between">
                            <div>
                                <span className="text-gray-500">Transacting as: </span>
                                <span className="font-medium">{paymentSummary.email}</span>
                            </div>
                            <button
                                type="button"
                            
                                className="text-xs font-semibold text-[#3F842E] hover:underline"
                            >
                                Change
                            </button>
                        </div>
                    </div>

                    {/* Right: payment method selection */}
                    <div className="bg-gray-50 border border-gray-200 rounded-xl px-6 py-5 flex flex-col min-h-[190px]">
                        <div className="text-sm font-semibold text-gray-900 mb-4">
                            How will you be paying today?
                        </div>

                        <div className="space-y-3 flex-1">
                            {paymentMethods.map((m) => {
                                const selected = selectedMethod === m.key;
                                return (
                                    <button
                                        key={m.key}
                                        type="button"
                                        onClick={() => setSelectedMethod(m.key)}
                                        className={`w-full flex items-center justify-between rounded-md border px-4 py-3 text-sm transition 
                    ${selected
                                                ? "border-[#3F842E] bg-white shadow-sm"
                                                : "border-gray-200 bg-white hover:border-gray-300"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span
                                                className={`inline-flex h-4 w-4 rounded-full border-2 ${selected ? "border-[#3F842E]" : "border-gray-300"
                                                    } items-center justify-center`}
                                            >
                                                {selected && (
                                                    <span className="h-2 w-2 rounded-full bg-[#3F842E]" />
                                                )}
                                            </span>
                                            <span className="font-medium text-gray-800">{m.label}</span>
                                        </div>

                                        {m.badge && (
                                            <span className="text-[11px] font-semibold text-gray-600 border border-gray-200 rounded-full px-3 py-1 bg-gray-50">
                                                {m.badge}
                                            </span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="mt-6 flex justify-center">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="px-6 py-2 rounded-full border border-gray-300 text-xs font-medium text-gray-700 hover:bg-gray-100"
                            >
                                Cancel transaction
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom security logos row */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-[10px] text-gray-400">
                    {[
                        "SECURE",
                        "3D SECURE",
                        "McAfee SECURE",
                        "GeoTrust",
                        "Verified by Visa",
                        "Mastercard SecureCode",
                        "PCI DSS",
                        "Safekey",
                        "VISA",
                        "Mastercard",
                    ].map((label) => (
                        <div
                            key={label}
                            className="px-3 py-1 rounded-full border border-gray-200 bg-gray-50"
                        >
                            {label}
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom navigation buttons (Back / Save & Continue) */}
            <div className="mt-6 flex items-right gap-4 align-middle justify-end">
                <button
                    type="button"
                    className="px-6 py-2 rounded-md bg-gray-800 text-white text-sm font-semibold hover:bg-gray-900"
                >
                    Back
                </button>

                <button
                    type="button"
                    onClick={handleContinue}
                    className="px-6 py-2 rounded-md bg-[#3F842E] text-white text-sm font-semibold hover:bg-green-700"
                >
                    Save &amp; Continue
                </button>
            </div>
        </div>
    );
}
