'use client';
import React, { useState, useEffect } from "react";
import Image from "next/image";
import ProfileForm from "../components/ProfileForm";
import BankInfoForm from "../components/BankInfoForm";
import PasswordForm from "../components/PasswordForm";
import { useRouter } from "next/navigation";
import jwt_decode from "jwt-decode";
import { fetchEmployeeData, axiosInstance } from "@/services/employees";


const HRProfile: React.FC = () => {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [clockedIn, setClockedIn] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [counter, setCounter] = useState(0);
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
        fetchProfileData();
      }
    } catch (error) {
      console.error("Invalid token:", error);
      router.push("/auth");
    }
  }, []);

  const fetchProfileData = async () => {
    try {
      const employeeData = await fetchEmployeeData();
      setProfile(employeeData.data);
    } catch (error) {
      console.error("Error fetching employee data:", error);
      router.push("/auth");
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (clockedIn && startTime) {
      timer = setInterval(() => {
        setCounter(Math.floor((new Date().getTime() - startTime.getTime()) / 1000));
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [clockedIn, startTime]);
  const token = localStorage.getItem("access")
  const handleClockIn = async () => {
    setClockedIn(true);
    setStartTime(new Date());
    let res = await axiosInstance.get("/employees/clock_in",{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200){
      localStorage.setItem("attendance_id", res.data.id)
    }
  };

  const handleClockOut = async () => {
    setClockedIn(false);
    setCounter(0);
    setStartTime(null);
    // Add your clock-out API call here
    let res = await axiosInstance.get(`/employees/clock_out/${localStorage.getItem("attendance_id")}`)
    if (res.status === 200){
      localStorage.removeItem("attendance_id")
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
  };

  if (!authenticated || !profile) {
    return null;
  }
 
  const bankInfo = {
    bank_code: profile?.bank_code,
    bank_name: profile?.bank_name,
    account_number: profile?.account_number,
    account_name: profile?.account_name,
    id: profile.id,
  };

  const user = {
    first_name: profile?.user?.first_name,
    last_name: profile?.user?.last_name,
    email: profile?.user?.email,
    mobile: profile?.user?.mobile,
    address: profile?.user?.address,
    gender: profile?.user?.gender,
    date_of_birth: profile?.user?.date_of_birth,
    id: profile.id
  }

  return (
    <div className="p-4">
      <div className="w-full flex gap-8 flex-col lg:flex-row">
        <div className="w-full lg:w-4/12 flex flex-col gap-8">
          <div className="p-4 h-fit rounded-lg shadow bg-white dark:bg-gray-800">
            <div className="w-32 h-32 rounded-full mx-auto">
              <Image
                src={profile.profile_picture}
                alt="profile picture."
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
              <h1 className="text-2xl font-bold">{profile.user?.first_name} {profile.user?.last_name}</h1>
              <h2 className="text-m pt-3 pb-3">{profile.job_title?.title}</h2>
              <div className="flex gap-4 justify-center items-center my-4">
                <button className="w-fit px-4 py-2 rounded-lg hover:bg-blue-700 bg-cyan-700 text-white">
                  Upload Picture
                </button>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-lg shadow bg-white dark:bg-gray-800">
            <h2 className="font-bold text-center text-slate-500 dark:text-slate-200 text-lg">Employee Details:</h2>
            <div className="space-y-4 px-4">
              <div className="flex justify-between items-center border-b pb-1 whitespace-nowrap">
                <p className="font-semibold text-slate-500 dark:text-slate-200 mr-4 flex-shrink-0">Employee ID:</p>
                <p className="text-slate-500 dark:text-slate-200 text-lg flex-shrink-0">{profile.employee_id}</p>
              </div>
              <div className="flex justify-between items-center border-b pb-1 whitespace-nowrap">
                <p className="font-semibold text-slate-500 dark:text-slate-200 mr-4 flex-shrink-0">Job Title:</p>
                <p className="text-slate-500 dark:text-slate-200 text-lg flex-shrink-0">{profile.job_title?.title}</p>
              </div>
              <div className="flex justify-between items-center border-b pb-1 whitespace-nowrap">
                <p className="font-semibold text-slate-500 dark:text-slate-200 mr-4 flex-shrink-0">Department:</p>
                <p className="text-slate-500 dark:text-slate-200 text-lg flex-shrink-0">{profile.department?.name}</p>
              </div>
              <div className="flex justify-between items-center border-b pb-1 whitespace-nowrap">
                <p className="font-semibold text-slate-500 dark:text-slate-200 mr-4 flex-shrink-0">Employment Type:</p>
                <p className="text-slate-500 dark:text-slate-200 text-lg flex-shrink-0">{profile.employment_type}</p>
              </div>
              <div className="flex justify-between items-center border-b pb-1 whitespace-nowrap">
                <p className="font-semibold text-slate-500 dark:text-slate-200 mr-4 flex-shrink-0">Manager:</p>
                <p className="text-slate-500 dark:text-slate-200 text-lg flex-shrink-0">{profile.manager?.first_name} {profile.manager?.last_name}</p>
              </div>
              <div className="flex justify-between items-center border-b pb-1 whitespace-nowrap">
                <p className="font-semibold text-slate-500 dark:text-slate-200 mr-4 flex-shrink-0">Work Location:</p>
                <p className="text-slate-500 dark:text-slate-200 text-lg flex-shrink-0">{profile.work_location}</p>
              </div>
              <div className="flex flex-col items-center gap-4 my-4">
                <div className="flex gap-4">
                  <button
                    onClick={handleClockIn}
                    disabled={clockedIn}
                    className={`w-fit px-4 py-2 rounded-lg ${clockedIn ? "bg-gray-500" : "bg-green-600"} text-white`}
                  >
                    Clock In
                  </button>
                  <button
                    onClick={handleClockOut}
                    disabled={!clockedIn}
                    className={`w-fit px-4 py-2 rounded-lg ${!clockedIn ? "bg-gray-500" : "bg-red-600"} text-white`}
                  >
                    Clock Out
                  </button>
                </div>
                {clockedIn && (
                  <div className="text-center">
                    <p className="text-slate-500 dark:text-slate-200">
                      Time elapsed: {counter} seconds
                    </p>
                    <p className="text-slate-500 dark:text-slate-200 whitespace-nowrap">
                      Hours spent: {formatTime(counter)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-8 whitespace-nowrap">
          <ProfileForm user={user}/>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 whitespace-nowrap">
            <BankInfoForm bankInfo={bankInfo} />
            <PasswordForm username={profile?.user.email}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRProfile;
