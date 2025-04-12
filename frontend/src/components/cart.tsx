import { useOrderStore } from '@/lib/store/order-store';
import { Button } from './ui/button';
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { Fragment } from 'react/jsx-runtime';

export const Cart = () => {
  const { items, getTotal, getQuantity, removeItem, updateQuantity } =
    useOrderStore();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant='outline'
          size='icon'
          className='relative'
        >
          <ShoppingCart />
          <p className='absolute -right-2 -top-2 bg-primary rounded-md text-xs size-5 flex items-center justify-center'>
            {getQuantity()}
          </p>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>My Cart</SheetTitle>
        </SheetHeader>
        <div className='px-4 space-y-4'>
          {items.map((item) => (
            <Fragment key={item.id}>
              <div className='flex items-start gap-4'>
                <img
                  src={item.image}
                  alt={item.name.slice(0, 5)}
                  className='w-16 h-16 shrink-0 object-cover rounded-md border border-border'
                />
                <div className='w-full flex flex-col gap-2'>
                  <div className='flex w-full justify-between'>
                    <span>{item.name}</span>
                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                  <div className='flex w-full justify-between'>
                    <div className='flex items-center border border-border rounded-full'>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => {
                          if (item.quantity > 1) {
                            updateQuantity(item.id, item.quantity - 1);
                          } else {
                            removeItem(item.id);
                          }
                        }}
                      >
                        <Minus />
                      </Button>
                      <span className='text-sm'>{item.quantity}</span>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => {
                          updateQuantity(item.id, item.quantity + 1);
                        }}
                      >
                        <Plus />
                      </Button>
                    </div>
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={() => {
                        removeItem(item.id);
                      }}
                    >
                      <Trash2 className='text-destructive' />
                    </Button>
                  </div>
                </div>
              </div>
              <div className='border border-t border-border last:border-none' />
            </Fragment>
          ))}
        </div>
        <SheetFooter className='border-t border-border'>
          <div className='flex justify-between items-center font-bold text-xl'>
            <span>Total</span>
            <span>₹{getTotal().toFixed(2)}</span>
          </div>
          <Button>Checkout</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
