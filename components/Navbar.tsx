"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../img/logo.png";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ThemeToggle from "./ThemeToggler";
import { useRouter } from "next/navigation";

interface NavbarProps {
  onToggleSidebar: () => void; // Accept a prop for toggling the sidebar
}

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const router = useRouter();

  const handleLogout = () => {
    if (!isMounted) return;

    // Clear authentication data
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("profile");

    // Redirect to login page
    router.push("/auth");
  };

  if (!isMounted) {
    return null; // Prevent rendering if the component is not mounted
  }

  return (
    <div className="bg-primary dark:bg-slate-700 text-white py-2 px-5 flex justify-between items-center">
      <Link href="/">
        <Image src={logo} alt="DARABARA HR Manager" width={100} height={60} />
      </Link>
      <div className="flex items-center md:hidden">
        <button
          onClick={onToggleSidebar}
          className="focus:outline-none p-2"
          aria-label="Toggle Sidebar"
        >
          ☰
        </button>
      </div>
      <div className="hidden md:flex items-center">
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback className="text-black"> BT </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/employees/me">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
