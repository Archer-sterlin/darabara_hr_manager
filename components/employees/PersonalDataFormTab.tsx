'use client';
import Employee from "./CompanyProfileSchema";
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
import personalData from "./PersonalDataSchema";



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
    street: z.string().min(3,{
      message: 'street is required'
    }),
    country: z.string().min(3,{
        message: 'country is required'
    }),
    state: z.string().min(3,{
    message: 'state is required'
    }),
    postal_code: z.string().min(3,{
    message: 'postal_code is required'
    }),
    town: z.string().min(3,{
    message: 'street is required'
    }),
    local_govt: z.string().min(3,{
    message: 'local govt is required'
    }),
    date_of_birth: z.string().min(3,{
    message: 'date of birth is required'
    }),
    highest_qualification: z.string().min(3,{
    message: 'highest qualification is required'
    }),
    linkedin_profile: z.string().min(3,{
    message: 'linkedin profile is required'
    }),
    marital_status: z.string().min(3,{
    message: 'marital status is required'
    }),

  })

const PersonalDataFormTab = ({ employee }: personalData) => {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        first_name: employee?.user?.first_name || '',
        last_name: employee?.user?.last_name || '',
        gender: employee?.user?.gender || '',
        date_of_birth: employee?.user?.date_of_birth || '',
        marital_status: employee?.user?.marital_status || '',
        mobile: employee?.user?.mobile || '',
        email: employee?.user?.email || '',
        street: employee?.address?.street || '',
        country: employee?.address?.country || '',
        state: employee?.address?.state || '',
        postal_code: employee?.address?.postal_code || '',
        town: employee?.address?.town || '',
        local_govt: employee?.address?.local_govt || '',
        highest_qualification: employee?.highest_qualification || '',
        linkedin_profile: employee?.linkedin_profile || '',
        
        means_of_identification_type: employee?.means_of_identification_type || '',
        },
    });

    const handleSubmit = (data: z.infer<typeof formSchema>) => {
        console.log(data)
        toast({
        title: 'Profile has been updated successfully',
        description: `Updated by ${employee?.user?.email}`,
        });
    };
    return ( 
        <>
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
}
 
export default PersonalDataFormTab;




