'use client';

import { toast } from '@/components/ui/use-toast';
import axios from 'axios';
import React, { useState, ChangeEvent, MouseEvent } from 'react';

interface UserDetails {
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  address: string;
  gender: string;
  date_of_birth: string;
  id: string;
}

interface FormData {
  user: {
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    address: string;
    date_of_birth: string;
  };
}

interface ProfileFormProps {
  user: UserDetails;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ user }) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    user: {
      first_name: user?.first_name,
      last_name: user?.last_name,
      email: user?.email,
      gender: user?.gender,
      address: user?.address,
      date_of_birth: user?.date_of_birth,
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      user: {
        ...formData.user,
        [name]: value,
      },
    });
  };

  const handleEditClick = () => {
    setIsEditable(!isEditable);
  };

  const handleSaveClick = async () => {
    setIsEditable(false);
    const token = localStorage.getItem('access');
    console.log(formData)
    try {
      const res = await axios.put(`http://chile64.pythonanywhere.com/api/v1/employees/${user.id}/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.status) {
        toast({
          title: 'Edited successfully',
          description: `Updated by ${formData.user.first_name} ${formData.user.last_name}`,
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
    <div className="w-full shadow-md rounded-md p-4 whitespace-nowrap">
      <h3 className="font-bold ml-4 mb-4 text-lg flex-shrink-0">Employee Information</h3>
      {['first_name', 'last_name', 'email', 'gender', 'address', 'date_of_birth'].map((field) => (
        <div key={field} className="mb-4 flex justify-between items-center border-b pb-1">
          <label className="text-slate-500 dark:text-slate-200 font-bold flex-shrink-0">
            {field.replace('_', ' ').replace(/\b\w/g, (char) => char.toUpperCase())}
          </label>
          <input
            type={field === 'email' ? 'email' : 'text'}
            name={field}
            value={formData.user[field as keyof typeof formData.user]}
            onChange={handleChange}
            disabled={!isEditable}
            className="w-10/12 p-2 disabled:text-slate-500 dark:bg-slate-950 ring-0 border-0 outline-0 focus:ring-0 focus:border-0 focus:outline-0 text-right"
          />
        </div>
      ))}
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
