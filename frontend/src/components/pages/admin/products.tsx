'use client';

import { SearchInput } from '@/components/search-input';
import { Button } from '@/components/ui/button';
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
import { useQuery } from '@tanstack/react-query';
import { Loader2, Trash2 } from 'lucide-react';
import { useQueryState } from 'nuqs';
import { useMemo } from 'react';

type ProductVariant = {
  id: number;
  productId: number;
  name: string;
  createdAt: string;
  image: string;
  prices: Price[];
};

type Price = {
  id: number;
  price: string;
};

type ProductVariantsResponse = {
  productVariants: ProductVariant[];
};

export const AdminProductsPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.adminProducts],
    queryFn: () =>
      axios
        .get<ProductVariantsResponse>('/admin/products')
        .then((res) => res.data),
  });

  console.log({ data });

  const [q] = useQueryState('q');
  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.productVariants.filter((product) => {
      if (!q) return true;
      const searchString = q.toLowerCase();
      return (
        String(product.id).toLowerCase().includes(searchString) ||
        product.name.toLowerCase().includes(searchString) ||
        product.productId.toString().toLowerCase().includes(searchString)
      );
    });
  }, [data, q]);

  if (isLoading) {
    return (
      <div className='container py-8 space-y-6'>
        <h1 className='text-2xl font-bold mb-6'>Products</h1>
        <Loader2 className='animate-spin mx-auto' />
      </div>
    );
  }

  return (
    <div className='container py-8 space-y-6'>
      <h1 className='text-2xl font-bold mb-6'>Products</h1>

      <div className='flex justify-end gap-4'>
        <SearchInput
          className='md:max-w-md'
          placeholder='Search by id, name...'
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell className='flex items-center gap-2'>
                <img
                  src={product.image}
                  className='size-10 rounded-md'
                />
                <span className='text-sm'>{product.name}</span>
              </TableCell>
              <TableCell>
                ₹{parseFloat(product.prices[0].price).toFixed(2)}
              </TableCell>
              <TableCell>
                <span className='text-sm text-green-400'>In Stock</span>
              </TableCell>
              <TableCell>
                {new Date(product.createdAt).toLocaleString('en-IN', {
                  year: '2-digit',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })}
              </TableCell>
              <TableCell>
                <Button
                  variant='ghost'
                  size='icon'
                >
                  <Trash2 className='text-destructive/60 hover:cursor-pointer hover:text-destructive size-4' />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {filteredData.length === 0 && (
        <div className='text-center py-8 text-muted-foreground'>
          No products found.
        </div>
      )}
    </div>
  );
};
