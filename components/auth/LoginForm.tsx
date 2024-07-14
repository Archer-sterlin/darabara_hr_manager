'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { toast } from '../ui/use-toast';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  username: z.string().min(3, {
    message: 'Username is required.',
  }),
  password: z.string().min(3, {
    message: 'Password is required',
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

  // useEffect(() => {
  //   const token = localStorage.getItem('access');
  //   if (token) {
  //     const decoded: any = jwt_decode(token);
  //     setUser(decoded);
  //     router.push(`/employees/me`);
  //   }
  //   setLoading(false);
  // }, [router]);

  const handleSubmit = async (form_data: z.infer<typeof formSchema>) => {
    try {
      const { data } = await axios.post('https://chile64.pythonanywhere.com/api/v1/auth/login/', form_data);
      if (data.token.access) {
        localStorage.setItem('access', data.token.access);
        localStorage.setItem('refresh', data.token.refresh);
        localStorage.setItem('profile', JSON.stringify(data.data));

        const decoded: any = jwt_decode(data.token.access);
        setUser(decoded);
        router.push(`/employees/me`);
      } else {
        toast({
          title: 'Error',
          description: `Failed to update`,
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: `${error}`,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Please enter your credentials</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0"
                      placeholder="Enter username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0"
                      placeholder=" Enter password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full dark:bg-slate-800 dark:text-white">
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
