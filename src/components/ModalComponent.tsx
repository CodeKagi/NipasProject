import logo from "../assets/dedect.svg";
import ChangePasswordStep from "./ChangePasswordStep.tsx";
import ResetPasswordStep from "./ResetPasswordStep.tsx";
import UpdatedPasswordStep from "./UpdatedPasswordStep.tsx";
import VerifyEmailStep from "./VerifyEmailStep.tsx";
import tick from "../assets/thankYouTick.svg";

interface ModalProps {
    step: string;
    isOpen: boolean;
    onClose: () => void;
    onStepChange: (step: any) => void;
}

export default function ModalComponent({step, onStepChange, isOpen, onClose}: ModalProps) {

    if (!isOpen) return null;

    const handleChildData = (data: any) => {
        onStepChange(data);
    };

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
                        className="absolute top-4 right-8 text-gray-500 font-bold hover:text-gray-700">
                        X
                    </button>

                    <div className="w-[23rem] mx-auto flex flex-col items-center text-center">
                        {/* Logo */}
                        <img
                            src={step === "success" ? tick : logo}
                            alt="Logo"
                            className="h-16 mb-4"
                        />

                        {/* Step content */}
                        {step === "create" && (<ChangePasswordStep heading="Create New Password"
                                                                   subHeading="Your new password must be different from previous password"
                                                                   onClick={handleChildData}/>)}
                        {step === "reset" && (<ResetPasswordStep heading="Reset Password"
                                                                 subHeading="Enter email to reset password"
                                                                 onClick={handleChildData}/>)}
                        {step === "success" && (<UpdatedPasswordStep heading="Password successfully saved"
                                                                 subHeading="Sign in with your new password"
                                                                 onClick={handleChildData}/>)}
                        {step === "verify" && (<VerifyEmailStep heading="Verify your email"
                                                                     subHeading="We sent a code via email please enter the code"
                                                                     onClick={handleChildData}/>)}

                    </div>
                </div>

                {/* Footer text */}
                <div className="text-center mt-4 text-sm">
                    {/*{step === "verify" ? (*/}
                    {/*  <>*/}
                    {/*    Didn’t receive password?{" "}*/}
                    {/*    <span*/}
                    {/*      className={`font-bold cursor-pointer text-[#3F842E] ${*/}
                    {/*        isDisabled ? "underline" : "opacity-50 cursor-not-allowed"*/}
                    {/*      }`}*/}
                    {/*      onClick={isDisabled ? handleResend : undefined}*/}
                    {/*    >*/}
                    {/*      Resend OTP*/}
                    {/*    </span>*/}
                    {/*  </>*/}
                    {/*) : step !== "success" ? (*/}
                    {/*  <>*/}
                    {/*    Don’t have access to current email?{" "}*/}
                    {/*    <span className="font-bold cursor-pointer text-[#3F842E]">Try another way</span>*/}
                    {/*  </>*/}
                    {/*) : null}*/}
                </div>
            </div>
        </div>
    );
}
