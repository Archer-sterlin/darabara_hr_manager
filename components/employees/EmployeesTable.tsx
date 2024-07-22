'use client';
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Adjust path based on your project structure
import { Employee } from "@/types/employees";
import { fetchAllEmployees } from "@/services/employees";

interface EmployeesTableProps {
  limit?: number;
  title?: string;
}

const EmployeesTable: React.FC<EmployeesTableProps> = ({ limit, title }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employeesData = await fetchAllEmployees();
        // Ensure the data is an array
        if (Array.isArray(employeesData.data?.results)) {
          setEmployees(employeesData.data.results);
        } else {
          console.error("Unexpected API response:", employeesData);
          setEmployees([]); // Set an empty array if data is not as expected
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
        setEmployees([]); // Set an empty array on error
      }
    };

    fetchEmployees();
  }, []);

  // Sorting employees by date joined
  const sortedEmployees = [...employees].sort(
    (a, b) => new Date(b.date_joined).getTime() - new Date(a.date_joined).getTime()
  );

  // Applying limit if provided
  const filteredEmployees = limit ? sortedEmployees.slice(0, limit) : sortedEmployees;

  return (
    <div className="mt-10">
      <h3 className="text-2xl mb-4 font-semibold">{title ? title : "Employees"}</h3>
      <Table>
        <TableCaption>Employees List</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Job Title</TableHead>
            <TableHead className="hidden md:table-cell">Email</TableHead>
            <TableHead className="hidden md:table-cell">Gender</TableHead>
            <TableHead className="hidden md:table-cell">Department</TableHead>
            <TableHead className="hidden md:table-cell text-right">Date Joined</TableHead>
            <TableHead>View</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredEmployees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>
                <Link href={`/employees/edit/${employee.id}`} className="hover:underline">
                  {employee?.user?.first_name} {employee?.user?.last_name}
                </Link>
              </TableCell>
              <TableCell>{employee.job_title?.title}</TableCell>
              <TableCell className="hidden md:table-cell">{employee?.user?.email}</TableCell>
              <TableCell className="hidden md:table-cell">{employee?.user?.gender}</TableCell>
              <TableCell className="hidden md:table-cell">{employee.department?.name}</TableCell>
              <TableCell className="hidden md:table-cell text-right">{employee.date_joined}</TableCell>
              <TableCell>
                <Link href={`/employees/edit/${employee.id}`}>
                  <button className="bg-cyan-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs">
                    Edit
                  </button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EmployeesTable;
