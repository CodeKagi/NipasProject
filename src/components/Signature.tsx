import { useState, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Upload, X } from "lucide-react";

export default function Signature() {
    const [activeTab, setActiveTab] = useState<"draw" | "upload">("draw");
    const [file, setFile] = useState<File | null>(null);
    const [penColor, setPenColor] = useState("black");
    const sigCanvas = useRef<SignatureCanvas | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const selectedFile = event.target.files[0];
            if (selectedFile.size > 2 * 1024 * 1024) {
                alert("File size exceeds 2MB");
                return;
            }
            setFile(selectedFile);
        }
    };

    const clearSignature = () => {
        sigCanvas.current?.clear();
    };

    const saveSignature = () => {
        if (activeTab === "draw") {
            if (!sigCanvas.current || sigCanvas.current.isEmpty()) {
                alert("Please draw your signature before saving.");
                return;
            }
            const dataURL = sigCanvas.current.toDataURL("image/png");

            const link = document.createElement("a");
            link.href = dataURL;
            link.download = "signature.png";
            link.click();

            console.log("Signature saved as PNG:", dataURL);
        }

        if (activeTab === "upload") {
            if (!file) {
                alert("Please upload a signature file before saving.");
                return;
            }

            const link = document.createElement("a");
            link.href = URL.createObjectURL(file);
            link.download = file.name;
            link.click();

            console.log("Uploaded file saved:", file.name);
        }
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
                            penColor={penColor}
                            canvasProps={{
                                className: "w-full h-full bg-gray-100 rounded-lg",
                            }}
                        />

                        {/* Controls */}
                        <div className="absolute top-2 right-2 flex space-x-2">
                            {/* Pen Colors */}
                            <button
                                className="w-5 h-5 rounded-full bg-black border border-gray-300"
                                title="Black Pen"
                                onClick={() => setPenColor("black")}
                            />
                            <button
                                className="w-5 h-5 rounded-full bg-blue-600 border border-gray-300"
                                title="Blue Pen"
                                onClick={() => setPenColor("blue")}
                            />
                            <button
                                className="w-5 h-5 rounded-full bg-red-600 border border-gray-300"
                                title="Red Pen"
                                onClick={() => setPenColor("red")}
                            />

                            {/* Save */}
                            <button
                                className="px-2 py-1 bg-green-600 text-white text-xs rounded"
                                title="Save Signature"
                                onClick={saveSignature}
                            >
                                Save
                            </button>

                            {/* Clear */}
                            <button
                                className="px-2 py-1 bg-gray-500 text-white text-xs rounded"
                                title="Clear Signature"
                                onClick={clearSignature}
                            >
                                Clear
                            </button>
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
                <button
                    className="px-6 py-2 bg-[#3F842E] text-white rounded-md hover:bg-green-700"
                    onClick={saveSignature}
                >
                    Accept and Sign
                </button>
            </div>
        </div>
    );
}
