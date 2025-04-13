import { CartItem } from '@/components/cart-item';
import { ShippingAndPaymentForm } from '@/components/shipping-and-payment-form';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { axios } from '@/lib/axios';
import { useOrderStore } from '@/lib/store/order-store';
import { OrderResponse } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { Fragment, useRef } from 'react';

const shippingCharge = 10;

export const ShopCheckoutPage = () => {
  const { items, getTotal, updateQuantity, removeItem, clearCart } =
    useOrderStore();
  const ref = useRef<HTMLButtonElement>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: (order: unknown) =>
      axios
        .post<OrderResponse>('/order/create', order)
        .then((res) => res.data)
        .catch((err) => {
          console.log(err);
          throw new Error('Failed to create order');
        }),
  });

  const placeOrder = async ({
    address,
    paymentMethod,
  }: {
    address: string;
    paymentMethod: string;
  }) => {
    const order = {
      shippingAddress: address,
      paymentMethod,
      items: items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        shopId: item.shopId,
      })),
    };

    mutate(order, {
      onSuccess: (data) => {
        console.log(data);
        // handle success
      },
    });
  };

  return (
    <div className='container py-8 grid gap-4 grid-cols-1 lg:grid-cols-6'>
      <Card className='lg:col-span-4'>
        <CardHeader className='font-bold text-2xl'>Checkout</CardHeader>
        <CardContent>
          <ShippingAndPaymentForm
            ref={ref}
            disabled={items.length === 0 || isPending}
            onSubmit={placeOrder}
          />
        </CardContent>
        <CardFooter>
          <Button
            className='w-full'
            onClick={() => {
              ref.current?.click();
            }}
            disabled={items.length === 0 || isPending}
          >
            {isPending && <Loader2 className='animate-spin' />}
            Place Order
          </Button>
        </CardFooter>
      </Card>
      <Card className='lg:col-span-2 self-baseline lg:sticky lg:top-[101px]'>
        <CardHeader className='font-bold text-2xl'>Order Summary</CardHeader>
        <CardContent>
          <div className='space-y-4'>
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
        </CardContent>
        <CardFooter className='flex flex-col border-t border-border'>
          <div className='flex w-full justify-between items-center text-muted-foreground'>
            <span>Sub Total</span>
            <span>₹{getTotal().toFixed(2)}</span>
          </div>
          <div className='flex w-full justify-between items-center text-muted-foreground'>
            <span>Shipping</span>
            <span>₹{shippingCharge}</span>
          </div>
          <div className='flex w-full justify-between items-center font-bold text-xl mt-4'>
            <span>Total</span>
            <span>₹{(getTotal() + shippingCharge).toFixed(2)}</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
