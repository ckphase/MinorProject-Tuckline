import { SearchInput } from '@/components/search-input';

export const ShopHome = () => {
  return (
    <div>
      <div className='relative text-white'>
        <img
          src='./background-two.jpg'
          alt='background'
          className='absolute -z-10 inset-0 object-cover object-top-left w-full h-full '
        />
        <div className='bg-gradient-to-b from-gray-900/50 to-gray-900/80'>
          <div className='container  mx-auto px-4 py-16'>
            <h1 className='text-4xl font-bold mb-4'>Tuckline Services</h1>
            <p className='text-emerald-200 text-lg'>
              Find and compare products across all LPU tuck shops in one place
            </p>
          </div>
        </div>
      </div>
      <div className='container py-8'>
        <SearchInput placeholder='Search by name...' />
      </div>
    </div>
  );
};
