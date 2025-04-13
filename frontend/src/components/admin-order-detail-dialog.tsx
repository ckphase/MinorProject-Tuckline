import { OrderItem } from '@/components/order-item';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { axios } from '@/lib/axios';
import { queryKeys } from '@/lib/query-keys';
import { OrderHistoryResponse, OrderWithShopAndCustomer } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Edit, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

const FormSchema = z.object({
  status: z.enum([
    OrderStatus.PENDING,
    OrderStatus.CONFIRMED,
    OrderStatus.DELIVERED,
    OrderStatus.CANCELLED,
  ]),
});

type FormValues = z.infer<typeof FormSchema>;

export const OrderDetailDialog = (order: OrderWithShopAndCustomer) => {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      status: order.status as OrderStatus,
    },
  });

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (values: FormValues) =>
      axios
        .patch<OrderHistoryResponse>(`/order/${order.id}`, values)
        .then((res) => res.data),
    onError: (error) => {
      toast.error('Failed to update order status', {
        // @ts-expect-error add types later
        description: error.response?.data.error,
      });
    },
  });

  const handleSubmit = async (values: FormValues) => {
    mutate(values, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [queryKeys.orders] });
        toast.success('Order status updated successfully');
        setIsOpen(false);
      },
    });
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        <Button
          variant='ghost'
          size='sm'
          className='gap-2 text-xs sm:text-sm'
        >
          <Edit className='h-4 w-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className='max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Order Detail</DialogTitle>
        </DialogHeader>
        <OrderItem {...order} />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name='status'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className='w-fit'>
                        <SelectValue placeholder='' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(OrderStatus).map((status) => (
                        <SelectItem
                          key={status}
                          value={status}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    You can change the status of the order to{' '}
                    {Object.values(OrderStatus).join(', ')}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type='submit'
                disabled={isPending}
              >
                {isPending && <Loader2 className='animate-spin' />}
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
