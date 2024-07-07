"use client";
import React, { useState, ChangeEvent, MouseEvent } from "react";

interface PasswordData {
  password: string;
  confirm_password: string;
}

const PasswordForm: React.FC = () => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [PasswordData, setPasswordData] = useState<PasswordData>({
    password: "xxxxxxxxxxxx",
    confirm_password: "xxxxxxxxxxxx",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData({ ...PasswordData, [name]: value });
  };

  const handleEditClick = (e: MouseEvent<HTMLButtonElement>) => {
    setIsEditable(!isEditable);
  };

  const handleSaveClick = (e: MouseEvent<HTMLButtonElement>) => {
    setIsEditable(false);
    // handle submit logic ... api call to submit the form
    console.log(PasswordData);
  };

  return (
    <div className="w-full  shadow-md rounded-md p-4">
      <h3 className="font-bold ml-4 mb-4 text-lg">
        Password Form --- To be Edited
      </h3>
      <div className="mb-4 flex justify-between items-center border-b pb-1">
        <label className="text-slate-500 dark:text-slate-200 font-bold">password</label>
        <input
          type="password"
          name="password"
          value={PasswordData.password}
          onChange={handleChange}
          disabled={!isEditable}
          className="w-10/12  p-2 disabled:text-gray-600 ring-0 border-0 outline-0 focus:ring-0 focus:border-0 focus:outline-0"
        />
      </div>
      <div className="mb-4 flex justify-between items-center border-b pb-1">
        <label className="text-slate-500 dark:text-slate-200 font-bold">confirm password</label>
        <input
          type="password"
          name="confirm_password"
          value={PasswordData.confirm_password}
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

export default PasswordForm;
