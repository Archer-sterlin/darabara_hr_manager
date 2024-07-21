'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image'; // Import Image from next/image
import BackButton from '@/components/BackButton';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { axiosInstance } from '@/services/employees';
import { LeaveRecord } from '@/types/employees';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';

const formSchema = z.object({
  leaveId: z.string(),
  leave_type: z.string().min(3),
  purpose: z.string().min(100),
  start_date: z.string().min(2),
  end_date: z.string().min(3),
  status: z.string().min(3),
});

const EmployeeStatusPage = () => {
  const [leaves, setLeaves] = useState<LeaveRecord[]>([]);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllLeaveData = async () => {
      try {
        const leaveData = await axiosInstance.get('/leave/');
        setLeaves(leaveData.data?.results);
      } catch (error) {
        console.error("Error fetching leaves:", error);
      }
    };

    fetchAllLeaveData();

    if (typeof window !== 'undefined') {
      setToken(localStorage.getItem('access'));
    }
  }, []);

  const { toast } = useToast();
  const methods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    if (!token) {
      toast({ title: 'Error', description: 'No token found' });
      return;
    }
    try {
      const res = await axiosInstance.put(`/leave/${data.leaveId}/status/`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.status) {
        toast({ title: 'Leave status updated', description: 'Status updated successfully.' });
      } else {
        throw new Error('Error updating leave status');
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Error updating leave status' });
    }
  };

  const statusOptions = [
    { value: 'approved', label: 'APPROVED' },
    { value: 'pending', label: 'PENDING' },
    { value: 'cancelled', label: 'CANCELLED' },
    { value: 'expired', label: 'EXPIRED' },
    { value: 'rejected', label: 'REJECTED' },
  ];

  const leaveTypeOptions = [
    { value: 'Annual', label: 'ANNUAL' },
    { value: 'Sick', label: 'SICK' },
    { value: 'Casual', label: 'CASUAL' },
  ];

  return (
    <>
      <BackButton text="Back To Employees list" link="/" />
      <h3 className="text-2xl mb-4">Employee Leave status update</h3>
      {leaves?.filter(leave => leave.status === 'pending')?.map(leave => {
          return (
            <FormProvider key={leave.id} {...methods}>
              <form onSubmit={handleSubmit(data => onSubmit({ ...data, leaveId: leave.id || '' }))}>
                <div className="space-y-8 border p-4 mb-8 rounded-md">
                  <div className="flex items-center space-x-4">
                    <Image
                      src={leave.employee?.profile_picture || '../../img/default_profile_pic.png'}
                      alt={`${leave.employee?.user.first_name} ${leave.employee?.user.last_name}`}
                      className="w-16 h-16 rounded-full"
                      width={64} // width of the image
                      height={64} // height of the image
                    />
                    <h3 className="text-xl font-semibold">{`${leave.employee?.user.first_name} ${leave.employee?.user.last_name}`}</h3>
                  </div>
                  <FormField
                    name="leave_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block uppercase text-xs font-bold text-zinc-500 dark:text-white mb-1">
                          Leave type
                        </FormLabel>
                        <FormControl>
                          <Input
                            readOnly
                            className="w-full bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0 cursor-pointer"
                            {...field}
                            value={leaveTypeOptions.find(option => option.value === field.value)?.label || ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="purpose"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                          Purpose
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            readOnly
                            className="bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="start_date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                          Start date
                        </FormLabel>
                        <FormControl>
                          <Input
                            readOnly
                            className="bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="end_date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                          End date
                        </FormLabel>
                        <FormControl>
                          <Input
                            readOnly
                            className="bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block uppercase text-xs font-bold text-zinc-500 dark:text-white mb-1">
                          Status
                        </FormLabel>
                        <FormControl>
                          <DropdownMenu>
                            <DropdownMenuTrigger>
                              <Input
                                className="w-full bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0 cursor-pointer"
                                placeholder="Update leave status"
                                {...field}
                                value={statusOptions.find(option => option.value === field.value)?.label || ''}
                              />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="mt-1">
                              {statusOptions.map(option => (
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
                  <input type="hidden" {...methods.register('leaveId')} value={leave.id || ''} />
                  <Button type="submit" className="w-full dark:bg-slate-800 dark:text-white hover:bg-cyan-500">
                    Submit
                  </Button>
                </div>
              </form>
            </FormProvider>
          );
        })}
    </>
  );
};

export default EmployeeStatusPage;
