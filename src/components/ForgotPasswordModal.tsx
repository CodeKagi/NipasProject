import { useState, useEffect } from "react";
import forgotPasswordLogo from "../assets/forgotPasswordLogo.svg";
import thankYouTick from "../assets/thankYouTick.svg"; // ✅ new success logo

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ForgotPasswordModal({ isOpen, onClose }: ForgotPasswordModalProps) {
  const [step, setStep] = useState<"reset" | "verify" | "create" | "success">("reset");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timer, setTimer] = useState(10);
  const [isDisabled, setIsDisabled] = useState(false);

  // Reset modal whenever it opens
  useEffect(() => {
    if (isOpen) {
      setStep("reset");
      setOtp(Array(6).fill(""));
      setTimer(10);
      setIsDisabled(false);
    }
  }, [isOpen]);

  // Timer logic
  useEffect(() => {
    let interval: number;
    if (step === "verify" && timer > 0) {
      interval = window.setInterval(() => setTimer((prev) => prev - 1), 1000);
      setIsDisabled(false);
    }
    if (timer === 0) {
      setIsDisabled(true);
    }
    return () => clearInterval(interval);
  }, [timer, step]);

  const handleResend = () => {
    setOtp(Array(6).fill(""));
    setTimer(15); // testing timer reset
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
        {/* Inner modal container */}
        <div
          className="bg-white relative w-[80%] max-w-[1318px] min-h-[350px] rounded-[44.29px] border-[2.66px] p-8 mb-[2rem]"
          style={{
            borderColor: "#3F842E",
            boxShadow: "-10px 15px 10px 2px #3F842E96",
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-8 text-gray-500 font-bold hover:text-gray-700"
          >
            X
          </button>

          <div className="w-[23rem] mx-auto flex flex-col items-center text-center">
            {/* Logo */}
            <img
              src={step === "success" ? thankYouTick : forgotPasswordLogo}
              alt="Logo"
              className="h-16 mb-4"
            />

            {/* Heading */}
            <h2 className="text-2xl font-bold mb-2 text-[#3F842E]">
              {step === "reset"
                ? "Reset Password"
                : step === "verify"
                ? "Verify Your Email"
                : step === "create"
                ? "Create New Password"
                : "Password Successfully Changed"}
            </h2>

            {/* Subheading */}
            <p
              className={`text-gray-600 ${
                step === "success" ? "text-base font-semibold" : "text-[10px] font-semibold"
              } mb-6`}
            >
              {step === "reset"
                ? "Enter your email to reset password"
                : step === "verify"
                ? "We sent a code via email. Please enter the code below."
                : step === "create"
                ? "Your new password must be different from previous password"
                : "Sign in with your new password"}
            </p>

            {/* Step content */}
            {step === "reset" && (
              <>
                <div className="w-full mb-4 text-left">
                  <label className="block mb-1 text-sm font-medium">Email</label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    className="w-full px-4 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  className="w-full py-2 bg-[#3F842E] text-white font-semibold rounded hover:bg-green-700 transition"
                  onClick={() => setStep("verify")}
                >
                  Reset Password
                </button>
              </>
            )}

            {step === "verify" && (
              <>
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
                  onClick={() => !isDisabled && setStep("create")}
                >
                  Verify
                </button>
              </>
            )}

            {step === "create" && (
              <>
                {/* New Password */}
                <div className="w-full mb-4 text-left">
                  <label className="block mb-1 text-sm font-medium">New Password</label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    className="w-full px-4 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Confirm Password */}
                <div className="w-full mb-4 text-left">
                  <label className="block mb-1 text-sm font-medium">Confirm Password</label>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    className="w-full px-4 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setStep("success")}
                  className="w-full py-2 bg-[#3F842E] text-white font-semibold rounded hover:bg-green-700 transition"
                >
                  Save
                </button>
              </>
            )}

            {step === "success" && (
              <>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2 bg-[#3F842E] text-white font-semibold rounded hover:bg-green-700 transition"
                >
                  Sign In
                </button>
              </>
            )}
          </div>
        </div>

        {/* Footer text */}
        <div className="text-center mt-4 text-sm">
          {step === "verify" ? (
            <>
              Didn’t receive password?{" "}
              <span
                className={`font-bold cursor-pointer text-[#3F842E] ${
                  isDisabled ? "underline" : "opacity-50 cursor-not-allowed"
                }`}
                onClick={isDisabled ? handleResend : undefined}
              >
                Resend OTP
              </span>
            </>
          ) : step !== "success" ? (
            <>
              Don’t have access to current email?{" "}
              <span className="font-bold cursor-pointer text-[#3F842E]">Try another way</span>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
