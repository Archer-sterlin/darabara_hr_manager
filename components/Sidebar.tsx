import Link from "next/link";
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command";
import { LayoutDashboard, Newspaper, Folders, CreditCard, Settings, User, Calendar } from "lucide-react";

const Sidebar = () => {
    return ( 
        <Command className="bg-secondary rounded-none">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
            <CommandItem>
                <Calendar className="mr-2 h-4 w-4" />
                <Link href='/' >Calender </Link>
            </CommandItem>
            <CommandItem>
                <User className="mr-2 h-4 w-4" />
                <Link href='/employees' >Employees </Link>
            </CommandItem>
            <CommandItem>
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <Link href='/' > Dashboard </Link>
            </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
            <CommandItem>
                <User className="mr-2 h-4 w-4" />
                <Link href='/' > Profile </Link>
            </CommandItem>
            <CommandItem>
                <Settings className="mr-2 h-4 w-4" />
                <Link href='/' > Settings </Link>
            </CommandItem>
            </CommandGroup>
        </CommandList>
        </Command>

     );
}
 
export default Sidebar;