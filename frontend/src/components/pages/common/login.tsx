import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { axios } from '@/lib/axios';
import { LoginResponse } from '@/types';

const FormSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().nonempty('Password is required'),
});

type FormValues = z.infer<typeof FormSchema>;

export const LoginPage = () => {
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: FormValues) =>
      axios.post<LoginResponse>('/auth/login', values),
    onError: (error) => {
      form.setError('root', {
        // @ts-expect-error add types later
        message: error.response?.data.error,
      });
    },
  });

  const handleSubmit = async (values: FormValues) => {
    mutate(values, {
      onSuccess: (data) => {
        if (data.data.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      },
    });
  };

  const errorMessage = form.formState.errors.root?.message;

  return (
    <div className='container flex items-center justify-center h-screen'>
      <Form {...form}>
        <form
          className='max-w-sm w-full flex flex-col gap-4'
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem className='flex flex-col items-start'>
                <FormLabel className='text-left'>Email</FormLabel>
                <FormControl className='w-full'>
                  <Input
                    placeholder='example@mail.com'
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
              <FormItem className='flex flex-col items-start'>
                <FormLabel className='text-left'>Password</FormLabel>
                <FormControl className='w-full'>
                  <Input
                    type='password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {errorMessage && (
            <p className='text-destructive text-sm'>{errorMessage}</p>
          )}

          <Button
            type='submit'
            disabled={isPending}
          >
            {isPending && <Loader2 className='animate-spin' />}
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
};
