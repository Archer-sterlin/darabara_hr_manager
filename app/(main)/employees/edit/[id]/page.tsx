'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import ProfileForm from "../../components/CompanyProfileForm";
import ViewBankInfoForm from "../../components/ViewBankInfoForm ";
import SalaryForm from "../../components/SalaryForm";
import Person from "@/img/kratos.png";
import { useRouter } from 'next/navigation';
import jwt_decode from 'jwt-decode';
import { fetchEmployeeData } from "@/services/employees";



const HRProfile: React.FC = () => {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) {
      router.push("/auth");
      return;
    }

    try {
      const decoded: any = jwt_decode(token);
      if (!decoded) {
        router.push("/auth");
      } else {
        setAuthenticated(true);
        fetchProfileData(decoded.user_id);
      }
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("access")
      router.push("/auth");
    }
  }, [router]);

  const fetchProfileData = async (id:any) => {
    try {
      const employeeData = await fetchEmployeeData(id);
      console.log("Fetched employee data:", employeeData.data);
      setProfile(employeeData.data);
    } catch (error) {
      console.error("Error fetching employee data:", error);
      router.push("/auth");
    }
  };


  if (!authenticated || !profile) {
    return null; // Render nothing while authentication is being checked
  }

  const bankInfo = {
    bank_code: profile?.bank_code,
    bank_name: profile?.bank_name,
    account_number: profile?.account_number,
    account_name: profile?.account_name,
  };

  const employee = {
    job_title: profile.job_title?.title,
    department: profile.department?.name,
    work_location: profile.work_location,
    employment_type: profile.employment_type,
    manager: `${profile.manager?.user?.first_name} ${profile.manager?.user?.last_name}`,
  };

  const salary = {
    base_salary: 2300,
    pay_grade: "level 16",
    tax_deductions: 23.4,
    other_deductions: 12.9,
    net_salary: 3000,
  };

  return (
    <div className="p-4">
      <div className="w-full flex gap-8 flex-col lg:flex-row">
        <div className="w-full lg:w-4/12 flex flex-col gap-8">
          <div className="p-4 h-fit rounded-lg shadow bg-white dark:bg-gray-800">
            <div className="w-32 h-32 rounded-full mx-auto">
              <Image
                src={Person}
                alt="sample profile picture."
                width={100}
                height={100}
                style={{
                  borderRadius: "99999999px",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="my-4 text-center text-slate-500 dark:text-slate-200">
              <h1 className="text-2xl font-bold pb-8">Personal Information</h1>
              <div className="space-y-4 px-4">
                <div className="flex justify-between items-center border-b pb-1 whitespace-nowrap">
                  <p className="font-semibold text-slate-500 dark:text-slate-200 mr-4 flex-shrink-0">Name:</p>
                  <p className="text-slate-500 dark:text-slate-200 text-lg flex-shrink-0">{profile.user?.first_name} {profile.user?.last_name}</p>
                </div>

                <div className="flex justify-between items-center border-b pb-1 whitespace-nowrap">
                  <p className="font-semibold text-slate-500 dark:text-slate-200 mr-4 flex-shrink-0">Email:</p>
                  <p className="text-slate-500 dark:text-slate-200 text-lg flex-shrink-0">{profile.user?.email}</p>
                </div>
                <div className="flex justify-between items-center border-b pb-1 whitespace-nowrap">
                  <p className="font-semibold text-slate-500 dark:text-slate-200 mr-4 flex-shrink-0">Mobile:</p>
                  <p className="text-slate-500 dark:text-slate-200 text-lg flex-shrink-0">{profile.user?.mobile}</p>
                </div>
                <div className="flex justify-between items-center border-b pb-1 whitespace-nowrap">
                  <p className="font-semibold text-slate-500 dark:text-slate-200 mr-4 flex-shrink-0">Gender:</p>
                  <p className="text-slate-500 dark:text-slate-200 text-lg flex-shrink-0">{profile.user?.gender}</p>
                </div>
                <div className="flex justify-between items-center border-b pb-1 whitespace-nowrap">
                  <p className="font-semibold text-slate-500 dark:text-slate-200 mr-4 flex-shrink-0">DOB:</p>
                  <p className="text-slate-500 dark:text-slate-200 text-lg flex-shrink-0">{profile.user?.date_of_birth}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-lg shadow bg-white dark:bg-gray-800">
            <h2 className="font-bold text-center text-slate-500 dark:text-slate-200 text-lg pb-8">Emergency Contact</h2>
            <div className="space-y-4 px-4">
              {profile.emergency_contacts?.map((contact: any) => (
                <div key={contact.id}>
                  <div className="flex justify-between items-center border-b pb-1 whitespace-nowrap">
                    <p className="font-semibold text-slate-500 dark:text-slate-200 mr-4 flex-shrink-0">Name:</p>
                    <p className="text-slate-500 dark:text-slate-200 text-lg flex-shrink-0">{contact.name}</p>
                  </div>
                  <div className="flex justify-between items-center border-b pb-1 whitespace-nowrap">
                    <p className="font-semibold text-slate-500 dark:text-slate-200 mr-4 flex-shrink-0">Phone Number:</p>
                    <p className="text-slate-500 dark:text-slate-200 text-lg flex-shrink-0">{contact.phone_number}</p>
                  </div>
                  <div className="flex justify-between items-center border-b pb-1 whitespace-nowrap">
                    <p className="font-semibold text-slate-500 dark:text-slate-200 mr-4 flex-shrink-0">Gender:</p>
                    <p className="text-slate-500 dark:text-slate-200 text-lg flex-shrink-0">{contact.gender}</p>
                  </div>
                  <div className="flex justify-between items-center border-b pb-1 whitespace-nowrap">
                    <p className="font-semibold text-slate-500 dark:text-slate-200 mr-4 flex-shrink-0">Relationship:</p>
                    <p className="text-slate-500 dark:text-slate-200 text-lg flex-shrink-0">{contact.relationship}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-8 whitespace-nowrap">
          <ProfileForm employee={employee} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 whitespace-nowrap">
            <ViewBankInfoForm bankInfo={bankInfo} />
            <SalaryForm salary={salary} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRProfile;
