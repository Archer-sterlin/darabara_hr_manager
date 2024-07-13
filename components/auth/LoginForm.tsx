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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useEffect, useState } from 'react';

const formSchema = z.object({
  username: z.string().min(3, {
    message: 'username is required.',
  }),
  password: z.string().min(3, {
    message: 'password is required',
  }),
});

const LoginForm = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (token) {
      const decoded = jwt_decode(token);
      setUser(decoded);
      router.push(`/employees/${decoded.user_id}`);
    }
    setLoading(false);
  }, [router]);

  const handleSubmit = async (form_data: z.infer<typeof formSchema>) => {
    try {
      const { data } = await axios.post('http://127.0.0.1:8000/api/v1/auth/login/', form_data);
 
      localStorage.setItem('access', data.token.access);
      localStorage.setItem('refresh', data.token.refresh);
      localStorage.setItem('profile', JSON.stringify(data.data));

      const decoded = jwt_decode(data.token.access);
      setUser(decoded);
     
      router.push(`/employees/me`);
    } catch (error) {
      console.error('Failed to login', error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Please enter your credentials</CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                    username
                  </FormLabel>
                  <FormControl>
                    <Input
                      className='bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0'
                      placeholder='Enter username'
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
            <Button type='submit' className='w-full dark:bg-slate-800 dark:text-white'>
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
