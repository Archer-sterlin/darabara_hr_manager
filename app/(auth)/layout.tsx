import ThemeToggle from "@/components/ThemeToggler";

const AuthLayout = ({ children }:{children: React.ReactNode}) => {
    return ( 
        <div className="flex h-[100vh] items-center justify-center relative">
            <div className="absolute bottom-5 right-0 text-white">
                <ThemeToggle />
            </div>
            {children}
        </div>
     );
}
 
export default AuthLayout;