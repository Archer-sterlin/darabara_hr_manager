'use client';
import React, { useEffect, useState } from 'react';
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
import EmployeeLeaveTable from '../components/EmployeesLeaveTable';
import { Employee } from '@/types/employees';

interface EmployeeLeavePageProp {
  params: {
    id: string;
  }
}

const formSchema = z.object({
  leave_type: z.string().min(3, {
    message: 'Leave type must be at least 3 characters long'
  }),
  purpose: z.string().min(100, {
    message: 'Purpose must be at least 100 characters long'
  }),
  start_date: z.string().min(2, {
    message: 'Start date must be at least 2 characters long'
  }),
  end_date: z.string().min(3, {
    message: 'End date must be at least 3 characters long'
  }),
});

const EmployeeLeavePage = ({ params }: EmployeeLeavePageProp) => {
  const { toast } = useToast();
  const [profile, setProfile] = useState<Employee | null>(null);

  useEffect(() => {
    const profileData = localStorage.getItem('profile');
    if (profileData) {
      try {
        const parsedProfile = JSON.parse(profileData);
        setProfile(parsedProfile);
      } catch (error) {
        console.error("Error parsing profile data: ", error);
        setProfile(null);
      }
    }
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const token = localStorage.getItem('access');

    try {
      const res = await axiosInstance.post('/leave/', data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.data.status == 200) {
        toast({
          title: 'Leave requested successfully',
          description: 'Leave request status is pending',
        });
      } else {
        throw new Error('Error requesting leave');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Error requesting leave',
      });
    }
  };

  const leaveTypeOptions = [
    { value: 'Annual', label: 'ANNUAL' },
    { value: 'Sick', label: 'SICK' },
    { value: 'Casual', label: 'CASUAL' },
  ];

  return (
    <>
      <BackButton text='Back To Employees list' link='/employees' />
      <h3 className='text-2xl mb-4'>Employee Leave Form</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='leave_type'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='block uppercase text-xs font-bold text-zinc-500 dark:text-white mb-1'>
                  Leave type
                </FormLabel>
                <FormControl>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Input
                        readOnly
                        className='w-full bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0 cursor-pointer'
                        placeholder='Select leave type'
                        {...field}
                        value={leaveTypeOptions.find(option => option.value === field.value)?.label || ''}
                      />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='mt-1'>
                      {leaveTypeOptions.map(option => (
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
            name='purpose'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                  Purpose
                </FormLabel>
                <FormControl>
                  <Textarea
                    className='bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0'
                    placeholder='Enter purpose of leave'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='start_date'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                  Start date
                </FormLabel>
                <FormControl>
                  <Input
                    className='bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0'
                    placeholder='Enter start date'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='end_date'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                  End date
                </FormLabel>
                <FormControl>
                  <Input
                    className='bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0'
                    placeholder='Enter leave end date'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className='w-full dark:bg-slate-800 dark:text-white hover:bg-cyan-500'>
            Submit
          </Button>
        </form>
      </Form>
      {profile && <EmployeeLeaveTable profile={profile} />}
    </>
  );
};

export default EmployeeLeavePage;
