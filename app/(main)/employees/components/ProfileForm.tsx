'use client';

import React, { useState, ChangeEvent, MouseEvent } from 'react';

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  address: string;
  gender: string;
  date_of_birth: string;
}

interface ProfileFormProps {
  user: FormData;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ user }) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    first_name: user?.first_name,
    last_name: user?.last_name,
    email: user?.email,
    mobile: user?.mobile,
    address: user?.address,
    gender: user?.gender,
    date_of_birth: user?.date_of_birth,
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
      <h3 className="font-bold ml-4 mb-4 text-lg flex-shrink-0">Employee Information</h3>
      <div className="mb-4 flex justify-between items-center border-b pb-1">
        <label className="text-slate-500 dark:text-slate-200 font-bold flex-shrink-0">First Name</label>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          disabled={!isEditable}
          className="w-10/12 p-2 disabled:text-slate-500 dark:bg-slate-950 ring-0 border-0 outline-0 focus:ring-0 focus:border-0 focus:outline-0 text-right"
        />
      </div>
      <div className="mb-4 flex justify-between items-center border-b pb-1">
        <label className="text-slate-500 dark:text-slate-200 font-bold">Last Name</label>
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          disabled={!isEditable}
          className="w-10/12 p-2 disabled:text-slate-500 dark:bg-slate-950 ring-0 border-0 outline-0 focus:ring-0 focus:border-0 focus:outline-0 text-right"
        />
      </div>
      <div className="mb-4 flex justify-between items-center border-b pb-1">
        <label className="text-slate-500 dark:text-slate-200 font-bold">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={!isEditable}
          className="w-10/12 p-2 disabled:text-gray-600 dark:bg-slate-950 ring-0 border-0 outline-0 focus:ring-0 focus:border-0 focus:outline-0 text-right"
        />
      </div>
     
      <div className="mb-4 flex justify-between items-center border-b pb-1">
        <label className="text-slate-500 dark:text-slate-200 font-bold">Mobile</label>
        <input
          type="text"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          disabled={!isEditable}
          className="w-10/12 p-2 disabled:text-gray-600 dark:bg-slate-950 ring-0 border-0 outline-0 focus:ring-0 focus:border-0 focus:outline-0 text-right"
        />
      </div>

      <div className="mb-4 flex justify-between items-center border-b pb-1">
        <label className="text-slate-500 dark:text-slate-200 font-bold">Gender</label>
        <input
          type="text"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          disabled={!isEditable}
          className="w-10/12 p-2 disabled:text-gray-600 dark:bg-slate-950 ring-0 border-0 outline-0 focus:ring-0 focus:border-0 focus:outline-0 text-right"
        />
      </div>

      <div className="mb-4 flex justify-between items-center border-b pb-1">
        <label className="text-slate-500 dark:text-slate-200 font-bold">DOB</label>
        <input
          type="text"
          name="date_of_birth"
          value={formData.date_of_birth}
          onChange={handleChange}
          disabled={!isEditable}
          className="w-10/12 p-2 disabled:text-gray-600 dark:bg-slate-950 ring-0 border-0 outline-0 focus:ring-0 focus:border-0 focus:outline-0 text-right"
        />
      </div>
      <div className="mb-4 flex justify-between items-center border-b pb-1">
        <label className="text-slate-500 dark:text-slate-200 font-bold">Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          disabled={!isEditable}
          className="w-10/12 p-2 disabled:text-gray-600 dark:bg-slate-950 ring-0 border-0 outline-0 focus:ring-0 focus:border-0 focus:outline-0 text-right"
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

export default ProfileForm;
