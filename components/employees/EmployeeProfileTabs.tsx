import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CompanyProfile from "./CompanyProfileTab";
import PersonalDataForm from "./CompanyProfileTab";
import Employee from "../../app/(main)/employees/components/CompanyProfileSchema";

const EmployeeTabs = ({employee}: Employee) => {
    return (
<>
      <h1 className=" text-gray-500 text-3xl title-font font-medium mb-4">{employee?.user?.first_name} {employee?.userlast_name}</h1>
        <div className="flex mb-4">
          <a className="flex-grow text-blue-500 border-b-2 border-blue-500 py-2 text-lg px-1">Employee Profile</a>
          <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">Reviews</a>
          <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">Details</a>
        </div>
     <Tabs defaultValue="company_profile" className="w-[400px]">
    <TabsList className="flex mb-4">

      <TabsTrigger className="flex-grow text-blue-500 border-b-2 border-blue-500 py-2 text-lg px-1" value="company_profile">company profile</TabsTrigger>
      <TabsTrigger className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1" value="register">Register</TabsTrigger>
    </TabsList>
    <TabsContent value="login"><CompanyProfile employee={employee} /></TabsContent>
    <TabsContent value="register"><PersonalDataForm employee={employee}/></TabsContent>
  </Tabs>
  </>
   );
}
 
export default EmployeeTabs;