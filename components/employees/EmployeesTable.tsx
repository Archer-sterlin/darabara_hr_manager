import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import Link from 'next/link';
import employees from '@/data/employees'
import { Employee } from "@/types/employees";


interface EmployeesTableProps {
    limit?: number;
    title?: string;
}
const EmployeesTable = ({limit, title}: EmployeesTableProps) => {
    const sortedEmployee: Employee[] = [...employees].sort((a, b) =>  new Date(b.date_joined).getTime() - new Date(a.date_joined).getTime());
    const filteredEmployees = limit ? sortedEmployee.slice(0, limit) : sortedEmployee;
    return ( 
        <div className="mt-10">
            <h3 className="text-2xl mb-4 font-semibold">
                { title ? title: 'Employees'}
            </h3>
            <Table>
                <TableCaption> Employees List</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Job Title</TableHead>
                        <TableHead className="hidden md:table-cell">Email</TableHead>
                        <TableHead className="hidden md:table-cell">Gender</TableHead>
                        <TableHead className="hidden md:table-cell">Department</TableHead>
                        <TableHead className="hidden md:table-cell text-right">Date Joined</TableHead> 
                        <TableHead >view</TableHead> 
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredEmployees.map((employee: Employee) => (
                        <TableRow key={employee.id}>
                            <TableCell>
                                <Link href={`/employee/${employee.id}`}>
                                    {employee?.user?.first_name} {employee?.user?.first_name} 
                                </Link>
                            </TableCell>
                            <TableCell>{employee.job_title}</TableCell>
                            <TableCell className="hidden md:table-cell">{employee?.user?.email}</TableCell>
                            <TableCell className="hidden md:table-cell">{employee?.user?.gender}</TableCell>
                            <TableCell className="hidden md:table-cell">{employee.department}</TableCell>
                            <TableCell className="text-right hidden md:table-cell">{employee.date_joined}</TableCell>
                            <TableCell > 
                                <Link href={`/employees/edit/${employee.id}`}>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs">Edit</button>
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
     );
}

export default EmployeesTable;