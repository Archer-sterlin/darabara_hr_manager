"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import jwt_decode from 'jwt-decode';
import Footer from '@/components/Footer';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

    // useEffect for authentication (uncomment when needed)
    // useEffect(() => {
    //     const token = localStorage.getItem('access');
    //     if (!token) {
    //         router.push('/auth');
    //         return;
    //     }

    //     try {
    //         const decoded = jwt_decode(token);
    //         if (!decoded) {
    //             router.push('/auth');
    //             return;
    //         }

    //         setIsLoggedIn(true);
    //     } catch (error) {
    //         console.error('Invalid token:', error);
    //         router.push('/auth');
    //     }
    // }, [router]);

    // if (!isLoggedIn) {
    //     return null;
    // }

    return (
        <>
            <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

            <div className="flex">
                <div className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} md:hidden`} onClick={() => setIsSidebarOpen(false)} />
                
                <div className={`fixed inset-y-0 left-0 w-64 bg-white transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 md:h-[100vh] md:block`}>
                    <Sidebar />
                </div>

                <div className="p-5 w-full md:max-w-[1140px] overflow-auto">
                    {children}
                </div>
            </div>

            <Footer />
        </>
    );
}

export default MainLayout;
