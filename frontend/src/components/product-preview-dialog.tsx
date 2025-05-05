import { useProductPreviewStore } from '@/lib/store/product-preview-store';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from './ui/dialog';
import { useOrderStore } from '@/lib/store/order-store';
import { toast } from 'sonner';
import { axios } from '@/lib/axios';
import { queryKeys } from '@/lib/query-keys';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { MeResponse } from '@/types';

type CartItem = {
  id: number;
  name: string;
  price: number;
  shopId: number;
};

export const ProductPreviewDialog = () => {
  const { data: productData, clearData } = useProductPreviewStore();
  const { addItem } = useOrderStore();
  const [selected, setSelected] = useState<CartItem | null>();
  const navigate = useNavigate();

  const { data: userData, isLoading } = useQuery({
    queryKey: [queryKeys.me],
    queryFn: () => axios.get<MeResponse>('/me').then((res) => res.data),
  });

  return (
    <Dialog open={!!productData} onOpenChange={clearData}>
      <DialogContent>
        <DialogHeader className="font-bold">Price Comparison</DialogHeader>
        <DialogDescription className="grid grid-cols-2 gap-4">
          {productData?.prices.map((price, index) => (
            <div
              key={index}
              className={cn('rounded-md border border-transparent', {
                'border border-primary': selected?.shopId === price.shop.id,
              })}
            >
              <Button
                variant="outline"
                onClick={() => {
                  setSelected({
                    id: productData.id,
                    name: price.shop.name,
                    price: parseFloat(price.price),
                    shopId: price.shop.id,
                  });
                }}
                className="flex-col h-20 w-full"
              >
                <p className="text-primary font-bold text-xl">₹{price.price}</p>
                <p className="text-sm text-muted-foreground">
                  {price.shop.name}
                </p>
              </Button>
            </div>
          ))}
        </DialogDescription>
        <DialogFooter>
          <Button
            onClick={() => {
              if (!userData) {
                toast.error('Please log in to add to cart');
                clearData(); // Optional: close the dialog
                navigate('/login');
                return;
              }

              if (selected) {
                addItem({
                  id: selected.id,
                  name: productData?.name || '',
                  price: selected.price,
                  image: productData?.image || '',
                  quantity: 1,
                  shopId: selected.shopId,
                });
                toast.success('Added to cart');
                clearData();
              } else {
                toast.error('Please select a shop to add to cart');
              }
            }}
          >
            Add to Cart
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
