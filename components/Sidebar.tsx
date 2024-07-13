// Sidebar.tsx

import React from 'react';
import Link from 'next/link';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { LayoutDashboard, User, Settings, Calendar, Folder } from "lucide-react";


const Sidebar = () => {
  return ( 
    <Command className="bg-secondary rounded-none">
      <CommandList>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <Calendar className="mr-2 h-4 w-4" />
            <Link href='#'>
              Calendar
            </Link>
          </CommandItem>
          <CommandItem>
            <User className="mr-2 h-4 w-4" />
            <Link href='/employees'>
              Employees
            </Link>
          </CommandItem>
          <CommandItem>
            <User className="mr-2 h-4 w-4" />
            <Link href='/employees/invite'>
              Invite
            </Link>
          </CommandItem>
          <CommandItem>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <Link href='/'>
              Dashboard
            </Link>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <Settings className="mr-2 h-4 w-4" />
            <Link href='/employees/me'>
              Settings
            </Link>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Documents">
          <CommandItem>
            <Folder className="mr-2 h-4 w-4" /> {/* Use Folder instead of Folders */}
            <Link href='#' >
                Upload Documents
            </Link>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
 
export default Sidebar;
