import React, { useState } from "react";
import { Select } from "antd";
import "flag-icons/css/flag-icons.min.css";

const { Option } = Select;

const countries = [
  { code: "ZA", dialCode: "+27", name: "South Africa" },
  { code: "US", dialCode: "+1", name: "United States" },
  { code: "GB", dialCode: "+44", name: "United Kingdom" },
  { code: "IN", dialCode: "+91", name: "India" },
  { code: "NG", dialCode: "+234", name: "Nigeria" },
];

export default function PhoneInput() {
  const [selectedCode, setSelectedCode] = useState("+27");

  return (
    <div className="w-full">
      <label className="block font-bold mb-1 text-black">
        Telephone (Home)
      </label>
      <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
        <Select
          value={selectedCode}
          onChange={(val) => setSelectedCode(val)}
          className="!w-28 !bg-gray-200 !border-r !border-gray-300"
          dropdownClassName="!rounded-md"
          bordered={false}
        >
          {countries.map((country) => (
            <Option key={country.code} value={country.dialCode}>
              <span className={`fi fi-${country.code.toLowerCase()} mr-2`} />
              {country.dialCode}
            </Option>
          ))}
        </Select>

        <input
          type="tel"
          placeholder="Enter phone number"
          className="flex-1 px-3 py-2 bg-gray-50 outline-none"
        />
      </div>
    </div>
  );
}
