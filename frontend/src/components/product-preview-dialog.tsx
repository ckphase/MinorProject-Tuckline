import { useProductPreviewStore } from '@/lib/store/product-preview-store';
import { Dialog, DialogContent, DialogFooter, DialogHeader } from './ui/dialog';
import { Button } from './ui/button';
import { DialogDescription } from '@radix-ui/react-dialog';
import { useState } from 'react';
import { cn } from '@/lib/utils';

type CartItem = {
  id: number;
  name: string;
  price: number;
  shopId: number;
};

export const ProductPreviewDialog = () => {
  const { data, clearData } = useProductPreviewStore();
  const [selected, setSelected] = useState<CartItem | null>();

  return (
    <Dialog
      open={!!data}
      onOpenChange={clearData}
    >
      <DialogContent>
        <DialogHeader className='font-bold'>Price Comparison</DialogHeader>
        <DialogDescription className='grid grid-cols-2 gap-4'>
          {data?.prices.map((price, index) => (
            <div
              key={index}
              // FIX: This is a temporary fix for the border issue
              //      idk why overriding the border is not working in the button
              className={cn('rounded-md border border-transparent', {
                'border border-primary': selected?.shopId === price.shop.id,
              })}
            >
              <Button
                variant='outline'
                onClick={() => {
                  setSelected({
                    id: data.id,
                    name: data.prices[index].shop.name,
                    price: parseFloat(price.price),
                    shopId: price.shop.id,
                  });
                }}
                className='flex-col h-20 w-full'
              >
                <p className='text-primary font-bold text-xl'>₹{price.price}</p>
                <p className='text-sm text-muted-foreground'>
                  {price.shop.name}
                </p>
              </Button>
            </div>
          ))}
        </DialogDescription>
        <DialogFooter>
          <Button>Add to Cart</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
