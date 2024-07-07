import EmployeesTable from "@/components/employees/EmployeesTable";
import BackButton from "@/components/BackButton";
import EmployeesPagination from "@/components/employees/EmployeesPagination";
const EmployeesPage = () => {
    return ( 
        <>
            <BackButton text="Go Back" link="/"/>
            <EmployeesTable title='All Employees'/> 
            <EmployeesPagination />
        </>
     );
}
 
export default EmployeesPage;