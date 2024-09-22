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
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { axiosInstance } from '@/services/employees';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

interface EmployeeEditPageProp {
  params: {
    id: string;
  };
}

const formSchema = z.object({
  means_of_identification: z.any().optional(),
  dbs: z.any().optional(),
  trainings: z.any().optional(),
  resume: z.any().optional(),
  right_to_work: z.any().optional(),
  means_of_identification_type: z.string().min(2, {
    message: 'Means of identification type must be at least 2 characters long',
  }),
});

const DocumentUploadPage = ({ params }: EmployeeEditPageProp) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof FileList && value.length > 0) {
        formData.append(key, value[0]);
      } else if (value) {
        formData.append(key, value as string);
      }
    });

    const token = localStorage.getItem('access');
    try {
      const res = await axiosInstance.post(`/employees/${params.id}/upload_files/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      if (res.data.status) {
        toast({
          title: 'File upload successful',
          description: 'Files uploaded successfully',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Error uploading files',
      });
    }
  };

  const idOptions = [
    { value: 'international_passport', label: 'INTERNATIONAL PASSPORT' },
    { value: 'drivers_licence', label: 'DRIVER LICENSE' },
    { value: 'voters_card', label: 'VOTERS CARD' },
    { value: 'id', label: 'ID' },
  ];

  return (
    <>
      <BackButton text='Back To Employees list' link='/employees' />
      <h3 className='text-2xl mb-4'>Upload Documents</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='means_of_identification_type'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='block uppercase text-xs font-bold text-zinc-500 dark:text-white mb-1'>
                  Means of Identification Type
                </FormLabel>
                <FormControl>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Input
                        readOnly
                        className='w-full bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0 cursor-pointer'
                        placeholder='Select Means of Identification Type'
                        {...field}
                        value={idOptions.find(option => option.value === field.value)?.label || ''}
                      />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='mt-1'>
                      {idOptions.map(option => (
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
            name='means_of_identification'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                  Means of Identification
                </FormLabel>
                <FormControl>
                  <Input
                    type='file'
                    accept='application/pdf'
                    className='bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0'
                    onChange={(e) => field.onChange(e.target.files)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='dbs'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                  DBS
                </FormLabel>
                <FormControl>
                  <Input
                    type='file'
                    accept='application/pdf'
                    className='bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0'
                    onChange={(e) => field.onChange(e.target.files)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='trainings'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                  Trainings
                </FormLabel>
                <FormControl>
                  <Input
                    type='file'
                    accept='application/pdf'
                    className='bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0'
                    onChange={(e) => field.onChange(e.target.files)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='resume'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                  Resume
                </FormLabel>
                <FormControl>
                  <Input
                    type='file'
                    accept='application/pdf'
                    className='bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0'
                    onChange={(e) => field.onChange(e.target.files)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='right_to_work'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                  Right to Work
                </FormLabel>
                <FormControl>
                  <Input
                    type='file'
                    accept='application/pdf'
                    className='bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0'
                    onChange={(e) => field.onChange(e.target.files)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className='w-full dark:bg-slate-800 dark:text-white hover:bg-cyan-500'>
            Upload
          </Button>
        </form>
      </Form>
    </>
  );
};

export default DocumentUploadPage;
