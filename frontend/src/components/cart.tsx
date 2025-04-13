import { useOrderStore } from '@/lib/store/order-store';
import { ShoppingCart } from 'lucide-react';
import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartItem } from './cart-item';
import { Button, buttonVariants } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';

export const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, getTotal, getQuantity, removeItem, updateQuantity } =
    useOrderStore();

  return (
    <Sheet
      open={isOpen}
      onOpenChange={setIsOpen}
    >
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
              <CartItem
                id={item.id}
                name={item.name}
                image={item.image}
                price={item.price}
                quantity={item.quantity}
                onRemove={() => removeItem(item.id)}
                onQuantityMinus={() => {
                  if (item.quantity > 1) {
                    updateQuantity(item.id, item.quantity - 1);
                  } else {
                    removeItem(item.id);
                  }
                }}
                onQuantityPlus={() => {
                  updateQuantity(item.id, item.quantity + 1);
                }}
                shopId={item.shopId}
              />
              <div className='border border-t border-border last:border-none' />
            </Fragment>
          ))}
        </div>
        <SheetFooter className='border-t border-border'>
          <div className='flex w-full justify-between items-center text-muted-foreground'>
            <span>Shipping</span>
            <span>calculated at checkout</span>
          </div>
          <div className='flex justify-between items-center font-bold text-xl'>
            <span>Total</span>
            <span>₹{getTotal().toFixed(2)}</span>
          </div>
          <Link
            to='/checkout'
            className={buttonVariants()}
            onClick={() => setIsOpen(false)}
          >
            Checkout
          </Link>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
