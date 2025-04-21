import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
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
import { queryKeys } from '@/lib/query-keys';

// Define form schema with Zod for validation
const FormSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().nonempty('Password is required'),
});

type FormValues = z.infer<typeof FormSchema>;

export const LoginPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: FormValues) => {
      try {
        const response = await axios.post<LoginResponse>('/auth/login', values);
        console.log('API Response:', response); // Check response structure
        return response;
      } catch (error) {
        console.error('Error during login:', error);
        throw error;
      }
    },
    onError: (error) => {
      form.setError('root', {
        message: error.response?.data.error,
      });
    },
  });

  const handleSubmit = async (values: FormValues) => {
    mutate(values, {
      onSuccess: (data) => {
        // Log the response for debugging
        console.log('Login successful:', data);

        // Ensure localStorage is set before navigation
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(data.data.user));
          localStorage.setItem('authToken', data.data.token);
        }

        queryClient.invalidateQueries({ queryKey: [queryKeys.me] });

        // Navigate based on user role
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
    <div className="container flex items-center justify-center h-screen">
      <Form {...form}>
        <form
          className="max-w-sm w-full flex flex-col gap-4"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start">
                <FormLabel className="text-left">Email</FormLabel>
                <FormControl className="w-full">
                  <Input placeholder="example@mail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start">
                <FormLabel className="text-left">Password</FormLabel>
                <FormControl className="w-full">
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Display Error Message */}
          {errorMessage && (
            <p className="text-destructive text-sm">{errorMessage}</p>
          )}

          {/* Submit Button */}
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="animate-spin" />}
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
};
