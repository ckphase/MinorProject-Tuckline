import { axios } from '@/lib/axios';
import { queryKeys } from '@/lib/query-keys';
import { MeResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { Users, Mail, Badge } from 'lucide-react';

export const ProfilePage = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [queryKeys.me],
    queryFn: () => axios.get<MeResponse>('/me').then((res) => res.data),
  });

  const user = data?.user;

  if (isLoading) {
    return (
      <div className="container p-6 space-y-10 flex justify-center items-center">
        <h1 className="text-3xl font-semibold text-gray-800 animate-pulse">📊 Loading Profile...</h1>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container p-6 space-y-10 text-center">
        <h1 className="text-3xl font-semibold text-red-600">Error Loading Profile</h1>
        <p className="text-gray-600 mt-2">
          Something went wrong: {error instanceof Error ? error.message : 'Unknown error'}
        </p>
      </div>
    );
  }

  return (
    <div className="container p-6 space-y-10 bg-gradient-to-r from-blue-100 via-indigo-200 to-purple-300 rounded-xl shadow-xl">
      <h1 className="text-4xl font-semibold text-gray-800 text-center mb-8">🌸 Profile Page</h1>

      {/* Profile Info Section */}
      <section className="bg-white p-4 rounded-xl shadow-lg flex space-x-6">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <span className="text-xl text-white font-semibold">{user?.name?.charAt(0)}</span>
          </div>
          <h2 className="text-xl font-semibold text-blue-700 mt-4">{user?.name}</h2>
        </div>
        <div className="flex flex-col space-y-4">
          <ProfileInfoItem label="Email" value={user?.email} icon={<Mail />} />
          <ProfileInfoItem label="Role" value={user?.role} icon={<Badge />} />
        </div>
      </section>

      {/* Customer or Shopkeeper Role Section */}
      <section className="bg-white p-4 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800">Role Information</h2>
        <p className="text-gray-600 mt-2">
          {user?.role === 'shopkeeper'
            ? 'You are a Shopkeeper. Manage your shop and orders from your dashboard.'
            : 'You are a Customer. Explore and shop your favorite items!'}
        </p>
      </section>
    </div>
  );
};

const ProfileInfoItem = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}) => (
  <div className="flex items-center space-x-3 hover:bg-indigo-50 p-2 rounded-lg transition-all duration-200 cursor-pointer">
    <div className="text-indigo-600">{icon}</div>
    <div>
      <h3 className="text-sm text-gray-500">{label}</h3>
      <p className="text-lg font-semibold text-gray-800">{value}</p>
    </div>
  </div>
);
