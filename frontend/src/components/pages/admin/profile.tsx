import { User } from 'lucide-react';

export const ProfilePage = () => {
  // Example user data (you can fetch it later if you want!)
  const user = {
    name: 'Ariana Blossom', // cute name ✨
    email: 'ariana.blossom@example.com',
    phone: '+91 9876543210',
    address: 'Seoul, South Korea 🌸',
    role: 'Artist & Developer',
    bio: 'Dreamer, Dancer, and Creator of Magic. 🎨✨',
    avatarUrl: 'https://i.pravatar.cc/150?img=47', // just a sample avatar!
  };

  return (
    <div className='p-8 space-y-8 bg-gradient-to-br from-pink-50 to-indigo-100 min-h-screen'>
      <h1 className='text-4xl font-bold text-center text-indigo-600'>🌸 Profile</h1>

      <div className='max-w-4xl mx-auto'>
        <div className='rounded-3xl bg-white shadow-lg p-8 flex flex-col items-center space-y-6 transition-all hover:shadow-2xl hover:scale-[1.02]'>
          {/* Avatar */}
          <img
            src={user.avatarUrl}
            alt='User Avatar'
            className='w-32 h-32 rounded-full border-4 border-pink-300 shadow-md'
          />

          {/* Name and Bio */}
          <div className='text-center'>
            <h2 className='text-2xl font-semibold text-gray-800'>{user.name}</h2>
            <p className='text-pink-500 mt-2'>{user.role}</p>
            <p className='text-gray-500 text-sm mt-1'>{user.bio}</p>
          </div>

          {/* Info Section */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mt-6'>
            <ProfileDetail label='📧 Email' value={user.email} />
            <ProfileDetail label='📱 Phone' value={user.phone} />
            <ProfileDetail label='🏠 Address' value={user.address} />
            <ProfileDetail label='💼 Role' value={user.role} />
          </div>

          {/* Cute Button */}
          <button className='mt-6 px-6 py-3 bg-pink-400 text-white rounded-full hover:bg-pink-500 shadow-md transition'>
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

const ProfileDetail = ({ label, value }: { label: string; value: string }) => (
  <div className='rounded-xl border border-gray-200 p-4 bg-pink-50 hover:bg-pink-100 transition'>
    <h3 className='text-sm font-medium text-gray-600'>{label}</h3>
    <p className='text-lg font-semibold text-gray-800 mt-1'>{value}</p>
  </div>
);
