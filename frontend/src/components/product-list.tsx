import { axios } from '@/lib/axios';
import { queryKeys } from '@/lib/query-keys';
import { serialize } from '@/lib/search-params';
import { ProductListResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from './product-card';
import { Dialog } from '@radix-ui/react-dialog';
import { ProductPreviewDialog } from './product-preview-dialog';
import { useProductPreviewStore } from '@/lib/store/product-preview-store';

export const ProductList = () => {
  const [searchParams] = useSearchParams();
  const { data: previewData } = useProductPreviewStore();
  const q = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';

  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.products, q, category],
    queryFn: () =>
      axios
        .get<ProductListResponse>(`/shop/products${serialize({ q, category })}`)
        .then((res) => res.data.products),
  });

  if (isLoading) {
    return <Loader2 className='mx-auto animate-spin' />;
  }

  return data?.length ? (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 container mx-auto px-4'>
      <Dialog>
        {data.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            id={product.id}
            prices={product.prices}
            product={product.product}
            createdAt={product.createdAt}
            productId={product.productId}
            image={product.image || './notebook-placeholder.jpg'}
          />
        ))}
        {/**
         * TODO: find a way to reset the selected field when the dialog is closed
         *       currently, it is not resetting the selected field when the dialog is closed
         **/}
        <ProductPreviewDialog key={previewData?.id} />
      </Dialog>
    </div>
  ) : (
    <div className='text-center'>No Products Found</div>
  );
};
