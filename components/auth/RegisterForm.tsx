'use client';

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
import { Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';


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
    }),
    password: z.string().min(3,{
        message: 'password is required'
    }),
    confirm_password: z.string().min(3,{
        message: 'password is required'
    })
  })

const RegisterForm = () => {
    const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: '',
        gender: '',
        email: '',
        job_title: '',
        department: '',
        password: '',
        confirm_password: '',
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data)
    router.push('/') 
  };

  return (
    <Card>
        <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>Please enter your user details</CardDescription>
        </CardHeader>
        <CardContent className='space-y-6'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
                    <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                        Full Name
                        </FormLabel>
                        <FormControl>
                        <Input
                            className='bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0'
                            placeholder='Enter Full Name'
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
                    name='department'
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                        Department
                        </FormLabel>
                        <FormControl>
                        <Textarea
                            className='bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0'
                            placeholder='Enter Department'
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
                <Button 
                type='submit' 
                className='w-full dark:bg-slate-800 dark:text-white'>
                Register
                </Button>
            </form>

        </Form>
        </CardContent>
    </Card>
  );
};

export default RegisterForm;