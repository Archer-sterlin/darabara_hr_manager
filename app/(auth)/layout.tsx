"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../../img/logo.png";
import ThemeToggle from "@/components/ThemeToggler";

const AuthLayout = ({ children }:{children: React.ReactNode}) => {
    return ( 
        <div className="flex flex-col h-[100vh] items-center justify-start relative">
            {/* Center image at the top */}
            <div className="mt-8">
                <Image src={logo} alt="DARABARA HR Manager" width={600} height={80} />
            </div>
            
            {/* Render the children elements below the image */}
            <div className="flex flex-col items-center justify-center flex-grow w-full">
                {children}
            </div>

            {/* Theme toggle button at the bottom-right */}
            <div className="absolute bottom-5 right-5 text-white">
                <ThemeToggle />
            </div>
        </div>
     );
}
 
export default AuthLayout;
