import { OrderItem } from '@/components/order-item';
import { axios } from '@/lib/axios';
import { queryKeys } from '@/lib/query-keys';
import { OrderHistoryResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { Loader2, ShoppingBag } from 'lucide-react';

export const ShopOrderHistoryPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.orders],
    queryFn: () =>
      axios.get<OrderHistoryResponse>('/order').then((res) => res.data),
  });

  if (isLoading) {
    return (
      <div className='py-8'>
        <Loader2 className='animate-spin mx-auto' />
      </div>
    );
  }

  return (
    <div className='container mx-auto py-8 space-y-6 max-w-3xl'>
      <h1 className='text-2xl font-bold mb-6 flex items-center gap-2'>
        <ShoppingBag className='h-5 w-5' />
        Your Orders
      </h1>

      {data?.orders.length === 0 ? (
        <div>No orders found.</div>
      ) : (
        <div className='space-y-8'>
          {data?.orders.map((order) => (
            <OrderItem
              key={order.id}
              {...order}
            />
          ))}
        </div>
      )}
    </div>
  );
};
