import React, { useEffect, useState } from 'react';
import BackButton from '@/components/BackButton';
import * as z from 'zod';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'; // Updated imports
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
import { Employee, LeaveRecord } from '@/types/employees';

interface EmployeeLeavePageProp {
  employees: Employee[];
}

const formSchema = z.object({
  leaveId: z.string(), // Include leaveId in your form schema
  leave_type: z.string().min(3, {
    message: 'Leave type must be at least 3 characters long',
  }),
  purpose: z.string().min(100, {
    message: 'Purpose must be at least 100 characters long',
  }),
  start_date: z.string().min(2, {
    message: 'Start date must be at least 2 characters long',
  }),
  end_date: z.string().min(3, {
    message: 'End date must be at least 3 characters long',
  }),
  status: z.string().min(3, {
    message: 'Status must be at least 3 characters long',
  }),
});

const EmployeeStatusPage: React.FC<EmployeeLeavePageProp> = ({ employees }) => {
  const { toast } = useToast();
  const methods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { handleSubmit } = methods;
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setToken(localStorage.getItem('access'));
    }
  }, []);

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    try {
      const res = await axiosInstance.put(`/leave/${data.leaveId}/status/`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.status) {
        toast({
          title: 'Leave status updated successfully',
          description: 'Leave status has been updated successfully.',
        });
      } else {
        throw new Error('Error updating leave status');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Error updating leave status',
      });
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
      {employees
        .filter(employee => employee.leave_records.some(record => record.status === 'pending'))
        .map(employee => {
          const pendingLeave = employee.leave_records.find(record => record.status === 'pending') as LeaveRecord | undefined;

          if (!pendingLeave) return null;

          return (
            <FormProvider key={employee.id} {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}> {/* Changed to <form> */}
                <div className="space-y-8 border p-4 mb-8 rounded-md">
                  <div className="flex items-center space-x-4">
                    <img
                      src={employee.profile_picture || '/default-profile.png'} // Use a default profile picture
                      alt={`${employee.user.first_name} ${employee.user.last_name}`}
                      className="w-16 h-16 rounded-full"
                    />
                    <h3 className="text-xl font-semibold">{`${employee.user.first_name} ${employee.user.last_name}`}</h3>
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
                  <input type="hidden" {...methods.register('leaveId')} value={pendingLeave.id || ''} />
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
