import {useEffect, useState} from "react";

interface ResetPasswordStepProps {
    onClick?: (data: any) => void,
    heading?: string,
    subHeading?: string
}

export default function VerifyEmailStep({onClick, heading, subHeading}: ResetPasswordStepProps) {

    const [otp, setOtp] = useState(Array(6).fill(""));
    const [timer, setTimer] = useState(10);

    // Timer logic
    useEffect(() => {
        let interval: number;
        if (timer > 0) {
            interval = window.setInterval(() => setTimer((prev) => prev - 1), 1000);
        }
        // if (timer === 0) {
        //     setIsDisabled(true);
        // }
        return () => clearInterval(interval);
    }, [timer]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? "0" + s : s}`;
    };

    const sendDataToParent = () => {
        if (onClick) {
            onClick('create');
        }
    };

    return (
        <div>
            {/* OTP input */}

            {/* Heading */}
            <h2 className="text-2xl font-bold mb-2 text-[#3F842E]">
                {heading}
            </h2>

            {/* Subheading */}
            <p className={`text-gray-600 mb-6`}>
                {subHeading}
            </p>

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
                className={`w-full py-2 text-white font-semibold rounded transition bg-[#3F842E] hover:bg-green-700"}`}
                // disabled={isDisabled}
                onClick={sendDataToParent}>
                Verify
            </button>
        </div>
    )
}