import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';

import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

const FormSchema = z.object({
  fullName: z.string().nonempty('Full name is required'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().regex(/^\d{10}$/, 'Phone number must be 10 digits'),
  block: z.string().nonempty('Hostel / Block is required'),
  roomNo: z.string().nonempty('Room number is required'),
  paymentMethod: z.enum(['COD'], {
    errorMap: () => ({ message: 'Payment method is required' }),
  }),
});

type FormValues = z.infer<typeof FormSchema>;

const paymentMethods = [
  { value: 'COD', label: 'Cash on Delivery' },
  // { value: 'UPI', label: 'UPI' },
];

export const ShippingAndPaymentForm = ({
  ref,
  disabled,
  onSubmit,
}: {
  ref?: React.Ref<HTMLButtonElement>;
  disabled?: boolean;
  onSubmit?: ({
    address,
    paymentMethod,
  }: {
    address: string;
    paymentMethod: string;
  }) => void;
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });

  const handleSubmit = async (values: FormValues) => {
    const address = `${values.fullName}, ${values.email}, ${values.phoneNumber}, B-${values.block}, R-${values.roomNo}`;
    onSubmit?.({ address, paymentMethod: 'COD' });
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className='space-y-8'
      >
        <div className='space-y-6'>
          <h2 className='text-xl font-bold'>Shipping Information</h2>
          <FormField
            control={form.control}
            name='fullName'
            disabled={disabled}
            render={({ field }) => (
              <FormItem className='flex flex-col items-start'>
                <FormLabel className='text-left'>Full Name</FormLabel>
                <FormControl className='w-full'>
                  <Input
                    placeholder='John Doe'
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
            disabled={disabled}
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
            name='phoneNumber'
            disabled={disabled}
            render={({ field }) => (
              <FormItem className='flex flex-col items-start'>
                <FormLabel className='text-left'>Phone Number</FormLabel>
                <FormControl className='w-full'>
                  <Input
                    placeholder='9876543210'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='block'
            disabled={disabled}
            render={({ field }) => (
              <FormItem className='flex flex-col items-start'>
                <FormLabel className='text-left'>Hostel / Block</FormLabel>
                <FormControl className='w-full'>
                  <Input
                    placeholder='Block-55'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='roomNo'
            disabled={disabled}
            render={({ field }) => (
              <FormItem className='flex flex-col items-start'>
                <FormLabel className='text-left'>Room Number</FormLabel>
                <FormControl className='w-full'>
                  <Input
                    placeholder='801'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='space-y-6'>
          <h2 className='text-xl font-bold'>Payment Method</h2>
          <FormField
            control={form.control}
            name='paymentMethod'
            disabled={disabled}
            render={({ field }) => (
              <FormItem className='flex flex-col items-start'>
                <FormControl className='w-full'>
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    {paymentMethods.map((method) => (
                      <div
                        key={method.value}
                        className={cn(
                          'flex items-center space-x-3 border border-border p-3 rounded-md',
                          {
                            'border-primary': field.value === method.value,
                          }
                        )}
                      >
                        <RadioGroupItem
                          value={method.value}
                          id={method.value}
                          className='border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary'
                        />
                        <Label
                          htmlFor={method.value}
                          className='text-sm w-full font-medium text-gray-700'
                        >
                          {method.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/**
         * This button is referenced in the parent component to trigger the form submission.
         */}
        <button
          type='submit'
          ref={ref}
          className='hidden'
        />
      </form>
    </Form>
  );
};
