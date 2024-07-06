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
  mobile: z.string().min(9,{
      message: 'Invalid mobile number'
  }),
  gender: z.string().min(3,{
      message: 'gender must be at least 3 characters long'
  }),
  email: z.string().min(3,{
      message: 'email must be at least 3 characters long'
  }),
  means_of_identification_type: z.string().min(3,{
    message: 'email must be at least 3 characters long'
  }),
  password: z.string().min(3,{
    message: 'password is required'
}),
confirm_password: z.string().min(3,{
    message: 'password is required'
})
})

const EmployeeEditPage = ({ params }: EmployeeEditPageProp) => {
  const { toast } = useToast();

  const employee = employees.find((employee) => employee.id === params.id);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: employee?.name || '',
      gender: employee?.gender || '',
      email: employee?.email || '',
      job_title: employee?.job_title || '',
      department: employee?.department || '',
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data)
    toast({
      title: 'Profile has been updated successfully',
      description: `Updated by ${employee?.name}`,
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
            name='means_of_identification_type'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                  ID Type
                </FormLabel>
                <FormControl>
                  <Input
                    className='bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0'
                    placeholder='Enter ID Type.'
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
            name='gender'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                  Gender
                </FormLabel>
                <FormControl>
                  <Input
                    className='bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0'
                    placeholder='Enter Gender'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
                    <FormItem>
                        <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                        password
                        </FormLabel>
                        <FormControl>
                        <Input
                            type='password'
                            className='bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0'
                            placeholder=' Enter password'
                            {...field}
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                        )}
                />

            <FormField
            control={form.control}
            name='confirm_password'
            render={({ field }) => (
                  <FormItem>
                      <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                      confirm password
                      </FormLabel>
                      <FormControl>
                      <Input
                          type='password'
                          className='bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0'
                          placeholder='Confirm password'
                          {...field}
                      />
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

export default EmployeeEditPage;