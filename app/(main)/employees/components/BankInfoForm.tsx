"use client";
import React, { useState, ChangeEvent, MouseEvent } from "react";

interface FormData {
  bank_name: string;
  bank_code: string;
  account_number: string;
 
}

const BankInfoForm: React.FC = () => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    bank_name: "Kenneth Valdez",
    bank_code: "fip@jukmuh.al",
    account_number: "fip@jukmuh.al",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditClick = (e: MouseEvent<HTMLButtonElement>) => {
    setIsEditable(!isEditable);
  };

  const handleSaveClick = (e: MouseEvent<HTMLButtonElement>) => {
    setIsEditable(false);
    // handle submit logic ... api call to submit the form
    console.log(formData);
  };

  return (
    <div className="w-full shadow-md rounded-md p-4">
      <h3 className="font-bold ml-4 mb-4 text-lg">
        Bank Information
      </h3>
      <div className="mb-4 flex justify-between items-center border-b pb-1">
        <label className="text-slate-500 dark:text-slate-200 font-bold">Bank Name</label>
        <input
          type="text"
          name="bankName"
          value={formData.bank_name}
          onChange={handleChange}
          disabled={!isEditable}
          className="w-10/12  p-2 disabled:text-gray-600 ring-0 border-0 outline-0 focus:ring-0 focus:border-0 focus:outline-0"
        />
      </div>
      <div className="mb-4 flex justify-between items-center border-b pb-1">
        <label className="text-slate-500 dark:text-slate-200 font-bold">Bank Code</label>
        <input
          type="bankCode"
          name="bankCode"
          value={formData.bank_code}
          onChange={handleChange}
          disabled={!isEditable}
          className="w-10/12  p-2 disabled:text-gray-600 ring-0 border-0 outline-0 focus:ring-0 focus:border-0 focus:outline-0"
        />
      </div>
      <div className="mb-4 flex justify-between items-center border-b pb-1">
        <label className="text-slate-500 dark:text-slate-200 font-bold">Account Number</label>
        <input
          type="bankCode"
          name="bankCode"
          value={formData.account_number}
          onChange={handleChange}
          disabled={!isEditable}
          className="w-10/12  p-2 disabled:text-gray-600 ring-0 border-0 outline-0 focus:ring-0 focus:border-0 focus:outline-0"
        />
      </div>
      <button
        onClick={isEditable ? handleSaveClick : handleEditClick}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        {isEditable ? "Save" : "Edit"}
      </button>
    </div>
  );
};

export default BankInfoForm;
