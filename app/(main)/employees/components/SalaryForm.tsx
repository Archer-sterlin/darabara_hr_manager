'use client';

import React, { useState, ChangeEvent, MouseEvent } from "react";

interface SalaryData {
  base_salary: number;
  pay_grade: string;
  tax_deductions: number;
  other_deductions: number;
  net_salary: number;
}

interface SalaryFormProps {
  salary: SalaryData;
}

const SalaryForm: React.FC<SalaryFormProps> = ({ salary }) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [salaryData, setSalaryData] = useState<SalaryData>({
    base_salary: salary.base_salary || 0.00,
    pay_grade: salary.pay_grade,
    tax_deductions: salary.tax_deductions || 0.00,
    other_deductions: salary.other_deductions || 0.00,
    net_salary: salary.net_salary || 0.00,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSalaryData({ ...salaryData, [name]: value });
  };

  const handleEditClick = (e: MouseEvent<HTMLButtonElement>) => {
    setIsEditable(!isEditable);
  };

  const handleSaveClick = (e: MouseEvent<HTMLButtonElement>) => {
    setIsEditable(false);
    // handle submit logic ... api call to submit the form
    console.log(salaryData);
  };

  return (
    <div className="w-full shadow-md rounded-md p-4">
      <h3 className="font-bold ml-4 mb-4 text-lg">Salary Information</h3>
      {Object.keys(salaryData).map((key) => (
        <div key={key} className="mb-4 flex justify-between items-center border-b pb-1">
          <label className="text-slate-500 dark:text-slate-200 font-bold">{key.replace(/_/g, " ")}</label>
          <input
            type={key.includes('salary') || key.includes('deductions') ? "number" : "text"}
            name={key}
            value={salaryData[key as keyof SalaryData]}
            onChange={handleChange}
            disabled={!isEditable}
            className="w-10/12 p-2 dark:bg-slate-950 disabled:text-gray-600 ring-0 border-0 outline-0 focus:ring-0 focus:border-0 focus:outline-0 text-right"
          />
        </div>
      ))}
      <button
        onClick={isEditable ? handleSaveClick : handleEditClick}
        className="w-full dark:bg-slate-800 dark:text-white hover:bg-cyan-500 px-4 py-2 rounded-md"
      >
        {isEditable ? "Save" : "Edit"}
      </button>
    </div>
  );
};

export default SalaryForm;
