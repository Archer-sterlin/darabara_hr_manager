import DashboardCard from "@/components/dashboard/DashboardCard";
import AnalyticsChart from "@/components/dashboard/AnalyticsCart";
import {User, CreditCard} from "lucide-react";
import EmployeesTable from "@/components/employees/EmployeesTable";

export default function Home() {
  return (
    <>
    <div className="flex flex-col md:flex-row justify-between gap-5 mb-5">
      <DashboardCard title='Employees' 
      count={43} 
      icon={<User className="text-slate-500" size={72} />} />
      <DashboardCard title='Clients' 
      count={256} 
      icon={<User className="text-slate-500" size={72} />} />
       <DashboardCard title='Revenue' 
      count={240} 
      icon={<CreditCard className="text-slate-500" size={72} />} />
       <DashboardCard title='Payouts' 
      count={900} 
      icon={<CreditCard className="text-slate-500" size={72} />} />
    </div>
    <AnalyticsChart />
    <EmployeesTable title='Employees' limit={5}/>
    </>
  );
}
