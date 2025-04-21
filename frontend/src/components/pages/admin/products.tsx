'use client';

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
import { ProductListResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useQueryState } from 'nuqs';
import { useMemo } from 'react';
// import { ProductDetailDialog } from '@/components/admin-product-detail-dialog';

const stockColors = {
  in_stock: 'bg-green-100 text-green-800 hover:bg-green-200',
  out_of_stock: 'bg-red-100 text-red-800 hover:bg-red-200',
  low_stock: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
};

export const AdminProductsPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.products],
    queryFn: () =>
      axios.get<ProductListResponse>('/product').then((res) => res.data),
  });

  const [q] = useQueryState('q');
  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.products.filter((product) => {
      if (!q) return true;
      const searchString = q.toLowerCase();
      return (
        String(product.id).toLowerCase().includes(searchString) ||
        product.name.toLowerCase().includes(searchString) ||
        product.sku?.toLowerCase().includes(searchString)
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
          placeholder='Search by id, name, SKU...'
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>₹{product.price.toFixed(2)}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                <Badge
                  variant='outline'
                  className={`${
                    stockColors[product.stockStatus as keyof typeof stockColors]
                  } px-2 py-0.5 capitalize text-xs font-medium`}
                >
                  {product.stockStatus}
                </Badge>
              </TableCell>
              <TableCell>
                {/* Replace with your ProductDetailDialog or edit/view button */}
                {/* <ProductDetailDialog {...product} /> */}
                <span className='text-sm text-muted-foreground'>Coming soon</span>
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
