import { SearchInput } from '@/components/search-input';
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
import { Loader2, User } from 'lucide-react';
import { useQueryState } from 'nuqs';
import { useMemo } from 'react';

export const AdminCustomersPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.orders],
    queryFn: () =>
      axios.get<AdminOrderHistoryResponse>('/order').then((res) => res.data),
  });

  const [q] = useQueryState('q');

  const customers = useMemo(() => {
    if (!data) return [];

    const customerMap: Record<
      string,
      {
        name: string;
        email: string;
        orderCount: number;
        lastOrderDate: string;
      }
    > = {};

    for (const order of data.orders) {
      const { email, name } = order.customer;
      if (!email) continue;

      if (!customerMap[email]) {
        customerMap[email] = {
          name: name || '-',
          email,
          orderCount: 1,
          lastOrderDate: order.createdAt,
        };
      } else {
        customerMap[email].orderCount++;
        if (
          new Date(order.createdAt) > new Date(customerMap[email].lastOrderDate)
        ) {
          customerMap[email].lastOrderDate = order.createdAt;
        }
      }
    }

    const list = Object.values(customerMap);
    if (q) {
      const search = q.toLowerCase();
      return list.filter(
        (c) =>
          c.name.toLowerCase().includes(search) ||
          c.email.toLowerCase().includes(search)
      );
    }
    return list;
  }, [data, q]);

  if (isLoading) {
    return (
      <div className="container py-8 space-y-6">
        <h1 className="text-2xl font-bold mb-6">Customers</h1>
        <Loader2 className="animate-spin mx-auto" />
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Customers</h1>

      <div className="flex justify-end gap-4">
        <SearchInput
          className="md:max-w-md"
          placeholder="Search by name or email..."
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead className="text-center">Orders</TableHead>
            <TableHead className="text-right">Last Order</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer, idx) => (
            <TableRow key={idx}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 flex items-center justify-center rounded-full bg-muted text-sm font-medium text-primary">
                    {customer.name
                      ? customer.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .toUpperCase()
                      : <User className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="font-medium">{customer.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {customer.email}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-center">{customer.orderCount}</TableCell>
              <TableCell className="text-right">
                {new Date(customer.lastOrderDate).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {customers.length === 0 && (
        <div className="text-center py-12 text-muted-foreground space-y-2">
          <User className="w-10 h-10 mx-auto opacity-50" />
          <p className="text-sm">No customers found. Try adjusting your search.</p>
        </div>
      )}
    </div>
  );
};
