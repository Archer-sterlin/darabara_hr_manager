'use client';
import React from 'react';
import Link from 'next/link';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Employee, LeaveRecord } from '@/types/employees';

interface EmployeeLeaveTableProps {
  profile: Employee;
}

const EmployeeLeaveTable: React.FC<EmployeeLeaveTableProps> = ({ profile }) => {
  return (
    <div className="mt-10">
      <h3 className="text-2xl mb-4 font-semibold">Employee Leave History</h3>
      <Table>
        <TableCaption>Leave history</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Leave type</TableHead>
            <TableHead className="hidden md:table-cell">Leave purpose</TableHead>
            <TableHead className="hidden md:table-cell">Start date</TableHead>
            <TableHead className="hidden md:table-cell">End date</TableHead>
            <TableHead className="hidden md:table-cell text-right">Status</TableHead>
            <TableHead>View</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {profile?.leave_records?.map((leave: LeaveRecord) => (
            <TableRow key={leave.id}>
              <TableCell>
                <Link href={`/employees/leave/edit/${leave.id}`} className="hover:underline">
                  {profile?.user?.first_name} {profile?.user?.last_name}
                </Link>
              </TableCell>
              <TableCell>{leave?.leave_type}</TableCell>
              <TableCell className="hidden md:table-cell">{leave?.purpose}</TableCell>
              <TableCell className="hidden md:table-cell">{leave?.start_date}</TableCell>
              <TableCell className="hidden md:table-cell">{leave?.end_date}</TableCell>
              <TableCell className="hidden md:table-cell">{leave?.status}</TableCell>
              <TableCell>
                <Link href={`/employees/leave/edit/${leave.id}`}>
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

export default EmployeeLeaveTable;
