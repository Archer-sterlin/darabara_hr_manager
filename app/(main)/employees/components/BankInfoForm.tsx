"use client";
import { toast } from '@/components/ui/use-toast';
import axios from 'axios';
import React, { useState, ChangeEvent, MouseEvent } from 'react';

interface FormData {
  bank_name: string;
  bank_code: string;
  account_number: string;
  account_name: string;
}

interface bankDetails {
  bank_name: string;
  bank_code: string;
  account_number: string;
  account_name: string;
  id:string
}

interface BankInfoFormProps {
  bankInfo: bankDetails;
}

const BankInfoForm: React.FC<BankInfoFormProps> = ({ bankInfo }) => {
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
  const handleSaveClick = async (e: MouseEvent<HTMLButtonElement>) => {
    setIsEditable(false);
    const token = localStorage.getItem('access');
    try {
      const res = await axios.put(`https://chile64.pythonanywhere.com/api/v1/employees/${bankInfo.id}/update_bank_info/`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (res.data.status) {
        toast({
          title: 'bank details updated successfully',
          description: `Updated successful`,
        });
      } else {
        toast({
          title: 'Error',
          description: `Failed to update`,
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: `${error}`,
      });
    }
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
      <button
        onClick={isEditable ? handleSaveClick : handleEditClick}
        className="w-full dark:bg-slate-800 dark:text-white hover:bg-cyan-500 px-4 py-2 rounded-md"
      >
        {isEditable ? 'Save' : 'Edit'}
      </button>
    </div>
  );
};

export default BankInfoForm;

