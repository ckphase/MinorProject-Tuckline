import { OrderDetailDialog } from '@/components/admin-order-detail-dialog';
import { SearchInput } from '@/components/search-input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { axios } from '@/lib/axios';
import { queryKeys } from '@/lib/query-keys';
import { AdminOrderHistoryResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { Loader2, ShoppingBag } from 'lucide-react';
import { useQueryState } from 'nuqs';
import { useMemo } from 'react';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
  delivered: 'bg-green-100 text-green-800 hover:bg-green-200',
  confirmed: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
  cancelled: 'bg-red-100 text-red-800 hover:bg-red-200',
};

export const AdminOrdersPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.orders],
    queryFn: () =>
      axios.get<AdminOrderHistoryResponse>('/order').then((res) => res.data),
  });

  const [q] = useQueryState('q');
  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.orders.filter((order) => {
      if (!q) return true;
      const searchString = q.toLowerCase();
      return (
        String(order.id).toLowerCase().includes(searchString) ||
        order.customer.name?.toLowerCase().includes(searchString) ||
        order.customer.email.toLowerCase().includes(searchString)
      );
    });
  }, [data, q]);

  if (isLoading) {
    return (
      <div className='container py-8 space-y-6'>
        <h1 className='text-2xl font-bold mb-6 flex items-center gap-2'>
          <ShoppingBag className='h-5 w-5' />
          Orders
        </h1>
        <Loader2 className='animate-spin mx-auto' />
      </div>
    );
  }

  return (
    <div className='container py-8 space-y-6'>
      <h1 className='text-2xl font-bold mb-6 flex items-center gap-2'>
        <ShoppingBag className='h-5 w-5' />
        Orders
      </h1>

      <div className='flex justify-end gap-4'>
        <SearchInput
          className='md:max-w-md'
          placeholder='Search by id, customer...'
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData?.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>
                <div>
                  {order.customer.name}
                  <div className='text-sm text-muted-foreground'>
                    {order.customer.email}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant='outline'
                  className={`${
                    statusColors[order.status as keyof typeof statusColors]
                  } px-2 py-0.5 capitalize text-xs font-medium`}
                >
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell>
                {new Date(order.createdAt).toLocaleString('en-IN', {
                  year: '2-digit',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })}
              </TableCell>
              <TableCell>
                <OrderDetailDialog {...order} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filteredData?.length === 0 && (
        <div className='text-center py-8 text-muted-foreground'>
          No orders found.
        </div>
      )}
    </div>
  );
};
