'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import ProfileForm from "../components/ProfileForm";
import AddressForm from "../components/AddressForm";
import BankInfoForm from "../components/BankInfoForm";
import PasswordForm from "../components/PasswordForm";
import Person from "@/img/kratos.png";

const HRProfile: React.FC = () => {
  const [clockedIn, setClockedIn] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (clockedIn && startTime) {
      timer = setInterval(() => {
        setCounter(Math.floor((new Date().getTime() - startTime.getTime()) / 1000));
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [clockedIn, startTime]);

  const handleClockIn = () => {
    setClockedIn(true);
    setStartTime(new Date());
  };

  const handleClockOut = () => {
    setClockedIn(false);
    setCounter(0);
    setStartTime(null);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
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
              <h1 className="text-2xl font-bold">John Doe</h1>
              <p className="text-sm">Software Engineer</p>
              <div className="flex gap-4 justify-center items-center my-4">
                <button className="w-fit px-4 py-2 rounded-lg bg-cyan-700 text-white">
                  Upload Picture
                </button>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-lg shadow bg-white dark:bg-gray-800">
            <h2 className="font-bold text-center text-slate-500 dark:text-slate-200 text-lg">Employee Details</h2>
            <div className="space-y-4 px-4">
              <div className="flex justify-between items-center border-b pb-1">
                <p className="font-semibold text-slate-500 dark:text-slate-200 mr-4">Employee ID</p>
                <p className="text-slate-500 dark:text-slate-200 text-lg">1101AD</p>
              </div>
              <div className="flex justify-between items-center border-b pb-1">
                <p className="font-semibold text-slate-500 dark:text-slate-200 mr-2">Job Title</p>
                <p className="text-slate-500 dark:text-slate-200 text-lg">Software Developer</p>
              </div>
              <div className="flex justify-between items-center border-b pb-1">
                <p className="font-semibold text-slate-500 dark:text-slate-200 mr-4">Employee Salary</p>
                <p className="text-slate-500 dark:text-slate-200 text-lg">100,000</p>
              </div>
              <div className="flex flex-col items-center gap-4 my-4">
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
        <div className="w-full flex flex-col gap-8">
          <ProfileForm />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <BankInfoForm />
            <PasswordForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRProfile;

