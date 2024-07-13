"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import jwt_decode from 'jwt-decode';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem('access');
        if (!token) {
            router.push('/auth');
            return;
        }

        try {
            const decoded = jwt_decode(token);
            if (!decoded) {
                router.push('/auth');
                return;
            }
            // Optionally, you can perform additional checks on the decoded token

            setIsLoggedIn(true);
        } catch (error) {
            console.error('Invalid token:', error);
            router.push('/auth');
        }
    }, [router]);

    if (!isLoggedIn) {
        // Optionally, you can show a loading spinner or a message while checking authentication
        return null;
    }

    return (
        <>
            <Navbar />

            <div className="flex h-screen">
                <div className="hidden md:block h-full w-[300px]">
                    <Sidebar />
                </div>
                <div className="p-5 w-full md:max-w-[1140px] overflow-auto">
                    {children}
                </div>
            </div>
        </>
    );
}

export default MainLayout;
