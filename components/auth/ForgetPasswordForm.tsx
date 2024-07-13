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
    email: z.string().min(3,{
        message: 'email must be at least 3 characters long'
    }),
  })

const ForgetPasswordForm = () => {
    const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        email: '',
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data)
    router.push('/') 
  };

  return (
    <Card>
        <CardHeader>
            <CardTitle>Forget Password</CardTitle>
            <CardDescription>Please enter your username</CardDescription>
        </CardHeader>
        <CardContent className='space-y-6'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
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

               
                <Button 
                type='submit' 
                className='w-full dark:bg-slate-800 dark:text-white'>
                Submit
                </Button>
            </form>

        </Form>
        </CardContent>
    </Card>
  );
};

export default ForgetPasswordForm;