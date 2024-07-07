'use client';
import Image from "next/image";
import kratos from "@/img/kratos.png" 


import BackButton from '@/components/BackButton';
import * as z from 'zod';


import { useToast } from '@/components/ui/use-toast';

import ProfileTabs from "@/components/employees/EmployeeProfileTabs";
import employees from "@/data/employees";


interface EmployeeEditPageProp {
  params: {
    id: string;
  }
}

const formSchema = z.object({
  name: z.string().min(3,{
      message: 'name must be at least 3 characters long'
  }),
  job_title: z.string().min(3,{
      message: 'Job title must be at least 3 characters long'
  }),
  department: z.string().min(3,{
      message: 'department must be at least 3 characters long'
  }),
  gender: z.string().min(3,{
      message: 'gender must be at least 3 characters long'
  }),
  email: z.string().min(3,{
      message: 'email must be at least 3 characters long'
  })
})

const EmployeeEditPage = ({ params }: EmployeeEditPageProp) => {
  const { toast } = useToast();

  const employee = employees.find((employee) => employee.id === params.id);


  return (
    <>
      <BackButton text='Back To Employees list' link='/employees' />

      <h3 className='text-2xl mb-4'>Settings</h3>
      <section className="text-gray-600 body-font overflow-hidden ">
  <div className="container px-5 py-24 mx-auto">
    <div className="lg:w-4/5 mx-auto flex flex-wrap">
      <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
        <h1 className=" text-gray-500 text-3xl title-font font-medium mb-4">{employee?.name}</h1>
        <div className="flex mb-4">
          <a className="flex-grow text-blue-500 border-b-2 border-blue-500 py-2 text-lg px-1">Employee Profile</a>
          <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">Reviews</a>
          <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">Details</a>
        </div>
       
        <ProfileTabs employee={employee} />
      </div>
      <Image className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={kratos} alt="Profile Picture"  />
  
    </div>
  </div>
</section>
    </>
  );
};

export default EmployeeEditPage;