interface ChangePasswordStepProps {
    onClick?: (data: any) => void,
    heading?: string,
    subHeading?: string
}

export default function ChangePasswordStep({onClick, heading, subHeading}: ChangePasswordStepProps) {

    const sendDataToParent = () => {
        if (onClick) {
            onClick('success');
        }
    };

    return (
        <div>
            {/* Heading */}
            <h2 className="text-2xl font-bold mb-2 text-[#3F842E]">
                {heading}
            </h2>

            {/* Subheading */}
            <p className={`text-gray-600 mb-6`}>
                {subHeading}
            </p>

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
                onClick={sendDataToParent}
                className="w-full py-2 bg-[#3F842E] text-white font-semibold rounded hover:bg-green-700 transition">
                Save
            </button>
        </div>
    )
}