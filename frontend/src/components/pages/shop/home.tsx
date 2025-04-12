import { Filter } from '@/components/filter';
import { ProductCard } from '@/components/product-card';
import { SearchInput } from '@/components/search-input';
import { IndianRupee, TagIcon } from 'lucide-react';

const categoryFilterOptions = ['all', 'snacks', 'stationery', 'others'];

const priceFilterOptions = ['asc', 'desc'];

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
      <div className='container py-8 flex gap-4 justify-between flex-col md:flex-row'>
        <SearchInput placeholder='Search by name...' />
        <div className='flex gap-4'>
          <Filter
            icon={<TagIcon className='size-4' />}
            label='All Categories'
            filterKey='category'
            options={categoryFilterOptions.map((category) => ({
              label: category,
              value: category,
            }))}
          />
          <Filter
            icon={<IndianRupee className='size-4' />}
            label='Price'
            filterKey='price'
            options={priceFilterOptions.map((order) => ({
              label: order,
              value: order,
            }))}
          />
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 container mx-auto px-4'>
        {Array.from({ length: 10 }, (_, i) => (
          <ProductCard
            key={i}
            name='Product Name'
            description='Product Description'
            image='./notebook-placeholder.jpg'
            category='snacks'
            price={{ min: 10, max: 100 }}
          />
        ))}
      </div>
    </div>
  );
};
