import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";


interface BackButtonProps {
    link: string;
    text: string;
}
const BackButton = ({link, text}: BackButtonProps) => {
    return ( 
        <Link href={link} className="text-gray-500 hover:underline flex items-center gap-1 font-bold mb-5">
            <ArrowLeftCircle className="mr-2 h-6 w-6" size={18} />
        </Link>
     );
}
 
export default BackButton;