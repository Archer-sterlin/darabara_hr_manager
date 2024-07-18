"use client";
import React, { useState, ChangeEvent, MouseEvent } from 'react';

interface FormData {
  bank_name: string;
  bank_code: string;
  account_number: string;
  account_name: string;
}

interface BankInfoFormProps {
  bankInfo: FormData;
}

const ViewBankInfoForm: React.FC<BankInfoFormProps> = ({ bankInfo }) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    bank_name: bankInfo.bank_name,
    bank_code: bankInfo.bank_code,
    account_number: bankInfo.account_number,
    account_name: bankInfo.account_name,
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
    // Handle submit logic... API call to submit the form
    console.log(formData);
  };

  return (
    <div className="w-full shadow-md rounded-md p-4">
      <h3 className="font-bold ml-4 mb-4 text-lg">Bank Information</h3>
      <div className="mb-4 flex justify-between items-center border-b pb-1 whitespace-nowrap">
        <label className="text-slate-500 dark:text-slate-200 font-bold flex-shrink-0">Bank Name</label>
        <input
          type="text"
          name="bank_name"
          value={formData.bank_name}
          onChange={handleChange}
          disabled={!isEditable}
          className="w-10/12 p-2 dark:bg-slate-950 disabled:text-gray-600 ring-0 border-0 outline-0 focus:ring-0 focus:border-0 focus:outline-0 text-right" // Changed text alignment to right
        />
      </div>
      <div className="mb-4 flex justify-between items-center border-b pb-1 whitespace-nowrap">
        <label className="text-slate-500 dark:text-slate-200 font-bold flex-shrink-0">Bank Code</label>
        <input
          type="text"
          name="bank_code"
          value={formData.bank_code}
          onChange={handleChange}
          disabled={!isEditable}
          className="w-10/12 p-2 dark:bg-slate-950 disabled:text-gray-600 ring-0 border-0 outline-0 focus:ring-0 focus:border-0 focus:outline-0 text-right" // Changed text alignment to right
        />
      </div>
      <div className="mb-4 flex justify-between items-center border-b pb-1 whitespace-nowrap">
        <label className="text-slate-500 dark:text-slate-200 font-bold">Account Number</label>
        <input
          type="text"
          name="account_number"
          value={formData.account_number}
          onChange={handleChange}
          disabled={!isEditable}
          className="w-10/12 p-2 dark:bg-slate-950 disabled:text-gray-600 ring-0 border-0 outline-0 focus:ring-0 focus:border-0 focus:outline-0 text-right" // Changed text alignment to right
        />
      </div>
      <div className="mb-4 flex justify-between items-center border-b pb-1 whitespace-nowrap">
        <label className="text-slate-500 dark:text-slate-200 font-bold">Account Name</label>
        <input
          type="text"
          name="account_name"
          value={formData.account_name}
          onChange={handleChange}
          disabled={!isEditable}
          className="w-10/12 p-2 dark:bg-slate-950 disabled:text-gray-600 ring-0 border-0 outline-0 focus:ring-0 focus:border-0 focus:outline-0 text-right" // Changed text alignment to right
        />
      </div>
      
    </div>
  );
};

export default ViewBankInfoForm;
