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
import employees from '@/data/employees';
import { useToast } from '@/components/ui/use-toast';

interface EmployeeEditPageProp {
  params: {
    id: string;
  }
}

const formSchema = z.object({
  first_name: z.string().min(3,{
    message: 'first name must be at least 3 characters long'
}),
last_name: z.string().min(3,{
  message: 'last name must be at least 3 characters long'
}),
mobile: z.string().min(3,{
  message: 'phone number must be at least 11 characters long'
}),
email: z.string().min(3,{
  message: 'email must be at least 3 characters long'
}),
role: z.string().min(3,{
  message: 'role must be at least 3 characters long'
}),
employment_type: z.string().min(3,{
  message: 'email must be at least 3 characters long'
}),
  job_title: z.string().min(3,{
      message: 'job title must be at least 3 characters long'
  }),
  job_description: z.string().min(3,{
    message: 'job title must be at least 3 characters long'
}),
  department_name: z.string().min(3,{
    message: 'last name must be at least 3 characters long'
}),
department_description: z.string().min(3,{
  message: 'last name must be at least 3 characters long'
}),
manager: z.string().min(9,{
      message: 'Invalid mobile number'
  }),
  work_location: z.string().min(3,{
      message: 'gender must be at least 3 characters long'
  }),
  last_promotion: z.string().min(3,{
      message: 'email must be at least 3 characters long'
  }),
})

const EmployeeInvitePage = ({ params }: EmployeeEditPageProp) => {
  const { toast } = useToast();



  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data)
    toast({
      title: 'Invite  successfully',
      description: `Updated by ${employee?.user?.first_name}`,
    });
  };

  return (
    <>
      <BackButton text='Back To Employees list' link='/employees' />
      <h3 className='text-2xl mb-4'>Edit Profile</h3>
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
                  <Input {...field} placeholder='Enter First Name' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name='last_name'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                  Last Name
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Enter Last Name' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                  Email
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Enter Email' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name='mobile'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                  Phone Number
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Enter Phone Number' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name='role'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                  Role
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Enter Role' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name='employment_type'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                  Employment Type
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Enter Employment Type' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name='job_title'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                  Job Title
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Enter Job Title' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name='job_description'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                  Job Description
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Enter Job Description' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name='department_name'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                  Department Name
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Enter Department Name' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name='department_description'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                  Department Description
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Enter Department Description' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name='manager'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                  Manager
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Enter Manager Information' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name='work_location'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                  Work Location
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Enter Work Location' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name='last_promotion'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                  Last Promotion Date
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Enter Last Promotion Date' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className='w-full dark:bg-slate-800 dark:text-white'>
            Update
          </Button>
        </form>
      </Form>
    </>
  );
};

export default EmployeeInvitePage;
