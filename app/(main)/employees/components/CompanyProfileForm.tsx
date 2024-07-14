"use client";
import React, { useState, ChangeEvent, MouseEvent } from 'react';

interface FormData {
  job_title: string;
  department: string;
  employment_type: string;
  manager: string;
  work_location: string;
}

interface ProfileFormProps {
  employee: FormData;
}

const CompanyProfileForm: React.FC<ProfileFormProps> = ({ employee }) => {

  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    job_title: employee?.job_title,
    department: employee?.department,
    employment_type: employee?.employment_type,
    manager: employee?.manager,
    work_location: employee?.work_location,
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
    <div className="w-full shadow-md rounded-md p-4 whitespace-nowrap">
      <h3 className="font-bold ml-4 mb-4 text-lg flex-shrink-0 bottom-3">Employee Information</h3>
      <div className="mb-4 flex justify-between items-center border-b pb-1">
        <label className="text-slate-500 dark:text-slate-200 font-bold flex-shrink-0">Job Title</label>
        <input
          type="text"
          name="job_title"
          value={formData.job_title}
          onChange={handleChange}
          disabled={!isEditable}
          className="w-10/12 p-2 disabled:text-slate-500 ring-0 border-0 outline-0 focus:ring-0 dark:bg-slate-950 focus:border-0 focus:outline-0 text-right"
        />
      </div>
      <div className="mb-4 flex justify-between items-center border-b pb-1">
        <label className="text-slate-500 dark:text-slate-200 font-bold">Department</label>
        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleChange}
          disabled={!isEditable}
          className="w-10/12 p-2 dark:bg-slate-950 disabled:text-slate-500 ring-0 border-0 outline-0 focus:ring-0 focus:border-0 focus:outline-0 text-right"
        />
      </div>
      <div className="mb-4 flex justify-between items-center border-b pb-1">
        <label className="text-slate-500 dark:text-slate-200 font-bold">Employment Type</label>
        <input
          type="text"
          name="employment_type"
          value={formData.employment_type}
          onChange={handleChange}
          disabled={!isEditable}
          className="w-10/12 p-2 dark:bg-slate-950 disabled:text-slate-500 ring-0 border-0 outline-0 focus:ring-0 focus:border-0 focus:outline-0 text-right"
        />
      </div>
      <div className="mb-4 flex justify-between items-center border-b pb-1">
        <label className="text-slate-500 dark:text-slate-200 font-bold">Manager</label>
        <input
          type="text"
          name="manager"
          value={formData.manager}
          onChange={handleChange}
          disabled={!isEditable}
          className="w-10/12 p-2 dark:bg-slate-950 disabled:text-slate-500 ring-0 border-0 outline-0 focus:ring-0 focus:border-0 focus:outline-0 text-right"
        />
      </div>
      <div className="mb-4 flex justify-between items-center border-b pb-1">
        <label className="text-slate-500 dark:text-slate-200 font-bold">Work Location</label>
        <input
          type="text"
          name="work_location"
          value={formData.work_location}
          onChange={handleChange}
          disabled={!isEditable}
          className="w-10/12 p-2 dark:bg-slate-950 disabled:text-slate-500 ring-0 border-0 outline-0 focus:ring-0 focus:border-0 focus:outline-0 text-right"
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

export default CompanyProfileForm;
