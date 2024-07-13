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

interface EmployeeEditPageProp {
  params: {
    id: string;
  }
}

const formSchema = z.object({
  first_name: z.string().min(3, {
    message: 'first name must be at least 3 characters long'
  }),
  last_name: z.string().min(3, {
    message: 'last name must be at least 3 characters long'
  }),
  mobile: z.string().min(11, {
    message: 'phone number must be at least 11 characters long'
  }),
  email: z.string().min(3, {
    message: 'email must be at least 3 characters long'
  }),
  role: z.string().min(3, {
    message: 'role must be at least 3 characters long'
  }),
  employment_type: z.string().min(3, {
    message: 'email must be at least 3 characters long'
  }),
  job_title: z.string().min(3, {
    message: 'job title must be at least 3 characters long'
  }),
  job_description: z.string().min(3, {
    message: 'job title must be at least 3 characters long'
  }),
  department_name: z.string().min(3, {
    message: 'last name must be at least 3 characters long'
  }),
  department_description: z.string().min(3, {
    message: 'last name must be at least 3 characters long'
  }),
  manager: z.string().min(9, {
    message: 'Invalid mobile number'
  }),
  work_location: z.string().min(3, {
    message: 'gender must be at least 3 characters long'
  }),
  last_promotion: z.string().min(3, {
    message: 'email must be at least 3 characters long'
  }),
});

const EmployeeInvitePage = ({ params }: EmployeeEditPageProp) => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    toast({
      title: 'Invite successfully',
      description: `Updated by ${data.first_name} ${data.last_name}`,
    });
  };

  const roleOptions = [
    { value: '0', label: 'Admin' },
    { value: '1', label: 'Manager' },
    { value: '2', label: 'Employee'},
    // Add more roles as needed
  ];

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
            name='role'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                  Role
                </FormLabel>
                <FormControl>
                  <DropdownMenu>
                    <DropdownMenuTrigger className='w-full'>
                      <Input
                        readOnly
                        className='w-full bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0 cursor-pointer'
                        placeholder='Select Role'
                        {...field}
                        value={roleOptions.find(option => option.value === field.value)?.label || ''}
                      />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='w-full'>
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
          {/* Add other fields here in a similar manner */}
          <Button className='w-full dark:bg-slate-800 dark:text-white hover:bg-cyan-500'>
            Invite
          </Button>
        </form>
      </Form>
    </>
  );
};

export default EmployeeInvitePage;
