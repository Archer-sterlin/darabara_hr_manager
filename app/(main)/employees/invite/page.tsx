'use client';
import BackButton from '@/components/BackButton';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import { axiosInstance } from '@/services/employees';
import { Employee, SalaryDetails } from '@/types/employees';

interface EmployeeEditPageProp {
  params: {
    id: string;
  }
}

const formSchema = z.object({
  first_name: z.string().min(3, {
    message: 'First name must be at least 3 characters long'
  }),
  last_name: z.string().min(3, {
    message: 'Last name must be at least 3 characters long'
  }),
  mobile: z.string().min(11, {
    message: 'Phone number must be at least 11 characters long'
  }),
  email: z.string().min(3, {
    message: 'Email must be at least 3 characters long'
  }),
  role: z.string().min(1, {
    message: 'Role must be at least 3 characters long'
  }),
  employment_type: z.string().min(3, {
    message: 'Employment type must be at least 3 characters long'
  }),
  job_title: z.string().min(3, {
    message: 'Job title must be at least 3 characters long'
  }),
  job_description: z.string().min(3, {
    message: 'Job description must be at least 3 characters long'
  }),
  department_name: z.string().min(1, {
    message: 'Department name must be at least 2 characters long'
  }),
  department_description: z.string().min(3, {
    message: 'Department description must be at least 3 characters long'
  }),
  manager: z.string(),
  work_location: z.string().min(3, {
    message: 'Work location must be at least 3 characters long'
  }),
  last_promotion: z.string().min(3, {
    message: 'Last promotion must be at least 3 characters long'
  }),
  base_salary: z.number(),
  pay_grade: z.string(),
  tax_deductions: z.number(),
  other_deductions: z.number(),
  net_salary: z.number(),
});


interface FormData {
  first_name: string;
  last_name: string;
  mobile: string;
  email: string;
  role: string;
  employment_type: string;
  job_title: string;
  job_description: string;
  department_name: string;
  department_description: string;
  manager: string;
  work_location: string;
  last_promotion: string;
  base_salary?: number; 
  pay_grade?: string; 
  tax_deductions?: number; 
  other_deductions?: number; 
  net_salary?: number; 
}

function extractAndCreateObjects(originalObject: FormData) {
  const {
    base_salary,
    pay_grade,
    tax_deductions,
    other_deductions,
    net_salary
  } = originalObject;

  const salaryObj = { base_salary, pay_grade, tax_deductions, other_deductions, net_salary  };
 

  delete originalObject.base_salary;
  delete originalObject.pay_grade;
  delete originalObject.tax_deductions;
  delete originalObject.other_deductions;
  delete originalObject.net_salary;

  return { salaryObj, originalObject };
}

const EmployeeInvitePage = ({ params }: EmployeeEditPageProp) => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    
    const token = localStorage.getItem('access');
    const {salaryObj, originalObject} = extractAndCreateObjects(data); 
    
    const res_user_invite = await axiosInstance.post('/invite/', originalObject,  {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    } );
    const res_salary = await axiosInstance.post('/salary/', salaryObj,  {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    } );
    if (res_user_invite.data.status) {
      toast({
        title: 'Invite successfully',
        description: `Updated by ${data.first_name} ${data.last_name}`,
      });
    }
    toast({
      title: 'Error',
      description: `Updated by ${data.first_name}`,
    });
  };

  const roleOptions = [
    { value: '0', label: 'Admin' },
    { value: '1', label: 'Manager' },
    { value: '2', label: 'Employee' },
  ];

  return (
    <>
      <BackButton text='Back To Employees list' link='/employees' />
      <h3 className='text-2xl mb-4'>Register Employee</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='first_name'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                  First Name
                </FormLabel>
                <FormControl>
                  <Input
                    className='bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0'
                    placeholder='Enter First Name'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='last_name'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                  Last Name
                </FormLabel>
                <FormControl>
                  <Input
                    className='bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0'
                    placeholder='Enter Last Name'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='mobile'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                  Phone Number
                </FormLabel>
                <FormControl>
                  <Input
                    className='bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0'
                    placeholder='Enter Phone Number'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    className='bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0'
                    placeholder='Enter Email'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='role'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='block uppercase text-xs font-bold text-zinc-500 dark:text-white mb-1'>
                  Role
                </FormLabel>
                <FormControl>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Input
                        readOnly
                        className='w-full bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0 cursor-pointer'
                        placeholder='Select Role'
                        {...field}
                        value={roleOptions.find(option => option.value === field.value)?.label || ''}
                      />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='mt-1'>
                      {roleOptions.map(option => (
                        <DropdownMenuItem
                          key={option.value}
                          onSelect={() => field.onChange(option.value)}
                        >
                          {option.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='employment_type'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                  Employment Type
                </FormLabel>
                <FormControl>
                  <Input
                    className='bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0'
                    placeholder='Enter Employment Type'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='job_title'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                  Job Title
                </FormLabel>
                <FormControl>
                  <Input
                    className='bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0'
                    placeholder='Enter Job Title'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='job_description'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                  Job Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    className='bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0'
                    placeholder='Enter Job Description'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='department_name'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                  Department Name
                </FormLabel>
                <FormControl>
                  <Input
                    className='bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0'
                    placeholder='Enter Department Name'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='department_description'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                  Department Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    className='bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0'
                    placeholder='Enter Department Description'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='manager'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                  Manager
                </FormLabel>
                <FormControl>
                  <Input
                    className='bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0'
                    placeholder='Enter Manager'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='work_location'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                  Work Location
                </FormLabel>
                <FormControl>
                  <Input
                    className='bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0'
                    placeholder='Enter Work Location'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='last_promotion'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                  Last Promotion
                </FormLabel>
                <FormControl>
                  <Input
                    className='bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0'
                    placeholder='Enter Last Promotion'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='base_salary'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                  Base salary
                </FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    className='bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0'
                    placeholder='Enter Base salary'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name='pay_grade'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                  Pay grade
                </FormLabel>
                <FormControl>
                  <Input
                    className='bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0'
                    placeholder='Enter Pay Grade'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name='tax_deductions'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                Tax Deductions
                </FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    className='bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0'
                    placeholder='Enter Tax Deduction'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name='other_deductions'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                  Other Deductions
                </FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    className='bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0'
                    placeholder='Enter Other Deductions'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name='net_salary'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                  Net Salary
                </FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    className='bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0'
                    placeholder='Enter Net Salary'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className='w-full dark:bg-slate-800 dark:text-white hover:bg-cyan-500'>
            Invite
          </Button>
        </form>
      </Form>
    </>
  );
};

export default EmployeeInvitePage;
