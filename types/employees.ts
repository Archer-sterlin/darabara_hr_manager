// types/employees.ts

import { StaticImageData } from "next/image";

export interface User {
    id: string;
    username: string;
    email: string;
    mobile: string;
    first_name: string;
    last_name: string;
    gender: string;
    role: string;
    address:string;
    date_of_birth: string;
    // Add other relevant fields as per your actual data structure
  }

export interface EmergencyContact {
    name: string;
    gender: string;
    relationship: string;
    phone_number: string;
  }
  
  export interface Department {
    id: number;
    name: string;
    description: string;
  }
  
  export interface JobTitle {
    id: number;
    department: Department;
    title: string;
    description: string;
  }

export interface SalaryDetails {

      base_salary: number;
      pay_grade: string;
      tax_deductions: number;
      other_deductions: number;
      net_salary: number;
      updated_at: string;
      is_current: boolean;
      created_at: string;
    
}
  

export interface Employee {
    id: string;
    employee_id: string;
    job_title: JobTitle;
    department: Department;
    employment_type: string;
    manager: User | null;
    emergency_contacts: Array<EmergencyContact>;
    salary_details: Array<SalaryDetails>;
    work_location: string;
    date_joined: string; // Consider using Date type if it's always in a consistent format
    date_of_last_promotion: string | null; // Consider using Date type if it's always in a consistent format
    highest_qualification: string | null;
    linkedin_profile: string | null;
    marital_status: string;
    means_of_identification: string | null;
    means_of_identification_type: string;
    mode_of_identification: string | null;
    profile_picture?: string | any;
    skills: string[] | null;
    status: string;
    updated_at: string; // Consider using Date type if it's always in a consistent format
    user: User;
  }
  

  export interface LeaveRecord {
    employee: Employee;
    id: string | null;
    leave_type:string;
    purpose:string;
    start_date:string;
    end_date:string;
    status:string |  null;
   }