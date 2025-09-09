import { useState, useEffect } from "react";
import forgotPasswordLogo from "../assets/forgotPasswordLogo.svg";
import thankYouTick from "../assets/thankYouTick.svg";

interface VerifyEmailModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function VerifyEmailModal({ isOpen, onClose }: VerifyEmailModalProps) {
    const [otp, setOtp] = useState(Array(6).fill(""));
    const [timer, setTimer] = useState(90);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setOtp(Array(6).fill(""));
            setTimer(90);
            setIsDisabled(false);
            setIsSuccess(false);
        }
    }, [isOpen]);

    useEffect(() => {
        let interval: number;
        if (isOpen && timer > 0 && !isSuccess) {
            interval = window.setInterval(() => setTimer((prev) => prev - 1), 1000);
            setIsDisabled(false);
        }
        if (timer === 0) {
            setIsDisabled(true);
        }
        return () => clearInterval(interval);
    }, [timer, isOpen, isSuccess]);

    const handleResend = () => {
        setOtp(Array(6).fill(""));
        setTimer(90);
        setIsDisabled(false);
    };

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? "0" + s : s}`;
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white w-[45rem] h-[35rem] flex flex-col justify-center items-center p-4 rounded-lg">
                <div
                    className="bg-white relative w-[80%] max-w-[500px] min-h-[350px] rounded-[20px] border-[2px] p-8"
                    style={{
                        borderColor: "#3F842E",
                        boxShadow: "-10px 15px 10px 2px #3F842E96",
                    }}
                >
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-6 text-gray-500 font-bold hover:text-gray-700"
                    >
                        X
                    </button>

                    <div className="w-[18rem] mx-auto flex flex-col items-center text-center">
                        {/* Logo */}
                        <img
                            src={isSuccess ? thankYouTick : forgotPasswordLogo}
                            alt="Logo"
                            className="h-16 mb-4"
                        />

                        {!isSuccess ? (
                            <>
                                {/* Heading */}
                                <h2 className="text-2xl font-bold mb-2 text-[#3F842E]">
                                    Verify Your Email
                                </h2>

                                {/* Subheading */}
                                <p className="text-gray-600 text-[10px] font-semibold mb-6">
                                    A 6-digit code has been sent to <br />
                                    <strong>zandik@gmail.com</strong> <br />
                                    <span className="font-bold cursor-pointer text-[#3F842E] underline">
                                        Change Email
                                    </span>
                                </p>

                                {/* OTP input */}
                                <div className="flex gap-2 mb-2">
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            maxLength={1}
                                            value={digit}
                                            onChange={(e) => {
                                                const val = e.target.value.replace(/\D/, "");
                                                const newOtp = [...otp];
                                                newOtp[index] = val;
                                                setOtp(newOtp);
                                            }}
                                            className="w-10 h-10 text-center border rounded text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    ))}
                                </div>

                                {/* OTP expiry */}
                                <p className="text-gray-500 text-xs mb-4">
                                    The OTP will expire in {formatTime(timer)}
                                </p>

                                {/* Verify button */}
                                <button
                                    className={`w-full py-2 text-white font-semibold rounded transition ${
                                        isDisabled
                                            ? "bg-gray-300 cursor-not-allowed"
                                            : "bg-[#3F842E] hover:bg-green-700"
                                    }`}
                                    disabled={isDisabled}
                                    onClick={() => setIsSuccess(true)}
                                >
                                    Verify
                                </button>

                                {/* Resend OTP link */}
                                <div className="text-center mt-4 text-sm">
                                    Didn’t receive OTP Code? <br />
                                    <span
                                        className={`font-bold cursor-pointer text-[#3F842E] ${
                                            isDisabled
                                                ? "underline"
                                                : "opacity-50 cursor-not-allowed"
                                        }`}
                                        onClick={isDisabled ? handleResend : undefined}
                                    >
                                        Resend OTP
                                    </span>{" "}
                                    or &nbsp;
                                    <span className="font-bold cursor-pointer text-[#3F842E] underline">
                                        Contact Support
                                    </span>
                                </div>
                            </>
                        ) : (
                            <>
                                <h2 className="text-2xl font-bold mb-2 text-[#3F842E]">
                                    Email Verified Successfully
                                </h2>

                                <p className="text-gray-700 text-lg mb-6">
                                    You can now sign in with your account
                                </p>

                                <button
                                    className="w-full py-2 bg-[#3F842E] text-white font-semibold rounded hover:bg-green-700 transition"
                                    onClick={onClose}
                                >
                                    Sign In
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
