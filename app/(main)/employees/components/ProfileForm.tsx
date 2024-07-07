"use client";
import React, { useState, ChangeEvent, MouseEvent } from "react";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  mobile: string;
  address: string;
}

const ProfileForm: React.FC = () => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "Kenneth",
    lastName: "Valdez",
    email: "fip@jukmuh.al",
    phone: "(234) 816-9029",
    mobile: "(320) 380-4539",
    address: "Bay Area, San Francisco, CA",
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
    <div className="w-full  shadow-md rounded-md p-4">
      <h3 className="font-bold ml-4 mb-4 text-lg">Employee Information</h3>
      <div className="mb-4 flex justify-between items-center border-b pb-1">
        <label className=" text-slate-500 dark:text-slate-200 font-bold">First Name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          disabled={!isEditable}
          className="w-10/12  p-2 disabled:text-slate-500 ring-0 border-0 outline-0 focus:ring-0 focus:border-0 focus:outline-0"
        />
      </div>
      <div className="mb-4 flex justify-between items-center border-b pb-1">
        <label className=" text-slate-500 dark:text-slate-200 font-bold">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          disabled={!isEditable}
          className="w-10/12  p-2 disabled:text-slate-500 ring-0 border-0 outline-0 focus:ring-0 focus:border-0 focus:outline-0"
        />
      </div>
      <div className="mb-4 flex justify-between items-center border-b pb-1">
        <label className=" text-slate-500 dark:text-slate-200 font-bold">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={!isEditable}
          className="w-10/12  p-2 disabled:text-gray-600 ring-0 border-0 outline-0 focus:ring-0 focus:border-0 focus:outline-0"
        />
      </div>
      <div className="mb-4 flex justify-between items-center border-b pb-1">
        <label className=" text-slate-500 dark:text-slate-200 font-bold">Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          disabled={!isEditable}
          className="w-10/12  p-2 disabled:text-gray-600 ring-0 border-0 outline-0 focus:ring-0 focus:border-0 focus:outline-0"
        />
      </div>
      <div className="mb-4 flex justify-between items-center border-b pb-1">
        <label className=" text-slate-500 dark:text-slate-200 font-bold">Mobile</label>
        <input
          type="text"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          disabled={!isEditable}
          className="w-10/12  p-2 disabled:text-gray-600 ring-0 border-0 outline-0 focus:ring-0 focus:border-0 focus:outline-0"
        />
      </div>
      <div className="mb-4 flex justify-between items-center border-b pb-1">
        <label className=" text-slate-500 dark:text-slate-200 font-bold">Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          disabled={!isEditable}
          className="w-10/12  p-2 disabled:text-gray-600 ring-0 border-0 outline-0 focus:ring-0 focus:border-0 focus:outline-0"
        />
      </div>
      <button
        onClick={isEditable ? handleSaveClick : handleEditClick}
        className="bg-cyan-700 text-white px-4 py-2 rounded-md"
      >
        {isEditable ? "Save" : "Edit"}
      </button>
    </div>
  );
};

export default ProfileForm;
