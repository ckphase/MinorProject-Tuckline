import { axios } from '@/lib/axios';
import { queryKeys } from '@/lib/query-keys';
import { AdminOrderHistoryResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';
import {
  BarChart as BarIcon,
  PieChart as PieIcon,
  ShoppingCart,
  Truck,
  Users,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  PieChart as RechartsPie,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export const AdminDashboard = () => {
  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.orders],
    queryFn: () =>
      axios.get<AdminOrderHistoryResponse>('/order').then((res) => res.data),
  });

  const orders = data?.orders || [];

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce(
    (sum, order) => sum + parseFloat(order.totalAmount),
    0
  );
  const uniqueUsers = new Set(orders.map((order) => order.customer.email)).size;
  const avgOrderValue = totalRevenue / totalOrders || 0;

  const orderStatusCounts = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = [
    { name: 'Pending', count: orderStatusCounts.pending || 0 },
    { name: 'Delivered', count: orderStatusCounts.delivered || 0 },
    { name: 'Cancelled', count: orderStatusCounts.cancelled || 0 },
  ];

  const pieChartData = [
    { name: 'Pending', value: orderStatusCounts.pending || 0 },
    { name: 'Delivered', value: orderStatusCounts.delivered || 0 },
    { name: 'Cancelled', value: orderStatusCounts.cancelled || 0 },
  ];

  return (
    <div className='p-6 space-y-10'>
      <h1 className='text-3xl font-semibold text-gray-800'>📊 Dashboard</h1>

      {isLoading ? (
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6 animate-pulse'>
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className='h-24 bg-gray-200 rounded-xl'
            />
          ))}
        </div>
      ) : (
        <>
          {/* Metrics Section */}
          <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            <MetricCard
              icon={<ShoppingCart />}
              label='Total Orders'
              value={totalOrders}
            />
            <MetricCard
              icon={<Users />}
              label='Unique Users'
              value={uniqueUsers}
            />
            <MetricCard
              icon={<Truck />}
              label='Pending Orders'
              value={orderStatusCounts.pending || 0}
            />
            <MetricCard
              icon={<Truck />}
              label='Delivered Orders'
              value={orderStatusCounts.delivered || 0}
            />
            <MetricCard
              icon={<Truck />}
              label='Cancelled Orders'
              value={orderStatusCounts.cancelled || 0}
            />
            <MetricCard
              icon={<BarIcon />}
              label='Total Revenue'
              value={`₹${totalRevenue.toFixed(2)}`}
            />
            <MetricCard
              icon={<PieIcon />}
              label='Average Order Value'
              value={`₹${avgOrderValue.toFixed(2)}`}
            />
          </section>

          {/* Chart Section */}
          <section className='mt-8'>
            <h2 className='text-xl font-semibold text-gray-800'>
              Order Status Breakdown
            </h2>
            <div className='flex space-x-4'>
              {/* Bar Chart */}
              <div className='w-full lg:w-1/2 h-[250px]'>
                <ResponsiveContainer
                  width='100%'
                  height='100%'
                >
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='name' />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey='count'
                      fill='#6366f1'
                      radius={[10, 10, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              {/* Pie Chart */}
              <div className='w-full lg:w-1/2 h-[250px]'>
                <ResponsiveContainer
                  width='100%'
                  height='100%'
                >
                  <RechartsPie
                    data={pieChartData}
                    innerRadius='40%'
                    outerRadius='80%'
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          index === 0
                            ? '#ff6347'
                            : index === 1
                            ? '#32cd32'
                            : '#d3d3d3'
                        }
                      />
                    ))}
                    <Tooltip />
                    <Legend />
                  </RechartsPie>
                </ResponsiveContainer>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

const MetricCard = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}) => (
  <div className='rounded-xl border border-gray-200 p-5 bg-white shadow transition-all hover:shadow-md hover:scale-[1.02] cursor-pointer group'>
    <div className='flex items-center space-x-4'>
      <div className='text-indigo-600 group-hover:scale-110 transition-transform'>
        {icon}
      </div>
      <div>
        <h2 className='text-sm text-gray-500'>{label}</h2>
        <p className='text-xl font-semibold text-gray-800'>{value}</p>
      </div>
    </div>
  </div>
);
