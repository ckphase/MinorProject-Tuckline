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

export const ProductList = () => {
  const [searchParams] = useSearchParams();
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
        <ProductPreviewDialog />
      </Dialog>
    </div>
  ) : (
    <div className='text-center'>No Products Found</div>
  );
};
