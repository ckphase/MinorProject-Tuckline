import { useQuery } from '@tanstack/react-query';
import { axios } from '@/lib/axios';
import { queryKeys } from '@/lib/query-keys';
import { AdminOrderHistoryResponse } from '@/types';

export const AdminDashboard = () => {
  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.orders],
    queryFn: () =>
      axios.get<AdminOrderHistoryResponse>('/order').then((res) => res.data),
  });

  const orders = data?.orders || [];

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const uniqueUsers = new Set(orders.map((order) => order.customer.email)).size;

  const orderStatusCounts = orders.reduce(
    (acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-semibold text-gray-800">Admin Dashboard</h1>

      {/* Metrics */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <MetricCard label="Total Orders" value={totalOrders} />
        <MetricCard label="Total Revenue" value={`₹${totalRevenue.toFixed(2)}`} />
        <MetricCard label="Unique Users" value={uniqueUsers} />
        <MetricCard label="Pending Orders" value={orderStatusCounts.pending || 0} />
        <MetricCard label="Delivered Orders" value={orderStatusCounts.delivered || 0} />
        <MetricCard label="Cancelled Orders" value={orderStatusCounts.cancelled || 0} />
      </section>

      {/* Recent Orders or Charts can go here */}
    </div>
  );
};

// Simple reusable card component
const MetricCard = ({ label, value }: { label: string; value: string | number }) => (
  <div className="rounded-lg border p-4 shadow-sm">
    <h2 className="text-sm font-medium text-gray-500">{label}</h2>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);
