import { useState, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Upload, X } from "lucide-react";

export default function Signature() {
    const [activeTab, setActiveTab] = useState<"draw" | "upload">("draw");
    const [file, setFile] = useState<File | null>(null);
    const sigCanvas = useRef<SignatureCanvas | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    };

    const clearSignature = () => {
        sigCanvas.current?.clear();
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
            {/* Header */}
            <h1 className="text-2xl font-bold text-[#3F842E] mb-4">Signature</h1>

            {/* Tabs */}
            <div className="flex border-b mb-4">
                <button
                    className={`mr-6 pb-2 ${activeTab === "draw"
                            ? "border-b-2 border-[#3F842E] font-semibold"
                            : "text-gray-600"
                        }`}
                    onClick={() => setActiveTab("draw")}
                >
                    Draw
                </button>
                <button
                    className={`pb-2 ${activeTab === "upload"
                            ? "border-b-2 border-[#3F842E] font-semibold"
                            : "text-gray-600"
                        }`}
                    onClick={() => setActiveTab("upload")}
                >
                    Upload
                </button>
            </div>


            {activeTab === "draw" && (
                <div className="relative bg-gray-100 rounded-lg p-4 flex flex-col items-center justify-center">
                    <div className="w-full h-48 border border-gray-300 rounded-lg relative">
                        <SignatureCanvas
                            ref={sigCanvas}
                            penColor="black"
                            canvasProps={{
                                className: "w-full h-full bg-gray-100 rounded-lg",
                            }}
                        />

                        <div className="absolute top-2 right-2 flex space-x-2">
                            <button
                                className="w-4 h-4 rounded-full bg-black border border-gray-300"
                                title="Black Pen"
                                onClick={() =>
                                    sigCanvas.current?.fromDataURL(sigCanvas.current?.toDataURL())
                                }
                            />
                            <button
                                className="w-4 h-4 rounded-full bg-green-600 border border-gray-300"
                                title="Save Signature"
                                onClick={() => {
                                    if (sigCanvas.current?.isEmpty()) return;
                                    alert("Signature saved!");
                                }}
                            />
                            <button
                                className="w-4 h-4 rounded-full bg-red-600 border border-gray-300"
                                title="Clear Signature"
                                onClick={clearSignature}
                            />
                        </div>

                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[80%] border-t border-gray-400"></div>
                    </div>
                </div>
            )}

            {activeTab === "upload" && (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    {!file ? (
                        <>
                            <p className="text-gray-700 font-medium mb-4">
                                Drag And Drop Image Or Scan
                            </p>
                            <p className="text-gray-500 mb-4">Or</p>
                            <label className="inline-flex items-center px-4 py-2 bg-[#3F842E] text-white rounded-md cursor-pointer hover:bg-green-700">
                                <Upload className="w-4 h-4 mr-2" />
                                Upload Signature
                                <input
                                    type="file"
                                    accept=".jpg,.jpeg,.png,.pdf"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </label>
                            <p className="text-sm text-gray-500 mt-3">
                                Accepted Formats: JPG, PNG, PDF <br />
                                Max File Size: 2MB
                            </p>
                        </>
                    ) : (
                        <div className="flex items-center justify-between p-3 border rounded-md bg-gray-50">
                            <span className="text-gray-700">{file.name}</span>
                            <button
                                className="text-red-500 hover:text-red-700"
                                onClick={() => setFile(null)}
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>
            )}


            <p className="text-xs text-gray-600 mt-4">
                By signing this document with an electronic signature, I agree that such
                signature will be as valid as handwritten signatures to the extent
                allowed by local law.
            </p>

            <div className="flex justify-between mt-6">
                <button className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
                    Cancel
                </button>
                <button className="px-6 py-2 bg-[#3F842E] text-white rounded-md hover:bg-green-700">
                    Accept and Sign
                </button>
            </div>
        </div>
    );
}
