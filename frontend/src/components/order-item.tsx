import { OrderWithShop } from '@/types';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { ChevronRight, Clock, Package, Store } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
  delivered: 'bg-green-100 text-green-800 hover:bg-green-200',
  confirmed: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
  cancelled: 'bg-red-100 text-red-800 hover:bg-red-200',
};

export const OrderItem = ({
  id,
  status,
  lines,
  shop,
  totalAmount,
  shippingAddress,
  paymentMethod,
  createdAt,
}: OrderWithShop) => {
  return (
    <Card>
      <CardHeader className='bg-muted/30 flex flex-row items-center justify-between'>
        <div className='flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4'>
          <div className='flex items-center gap-2'>
            <Package className='h-4 w-4 text-muted-foreground' />
            <h3 className='font-semibold'>Order #{id}</h3>
          </div>
          <Badge
            variant='outline'
            className={`${
              statusColors[status as keyof typeof statusColors]
            } px-2 py-0.5 capitalize text-xs font-medium`}
          >
            {status}
          </Badge>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant='ghost'
              size='sm'
              className='gap-1 text-xs sm:text-sm'
            >
              View Details
              <ChevronRight className='h-4 w-4' />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <div>
              <h2 className='font-bold'>Shipping to:</h2>
              <p className='text-muted-foreground'>{shippingAddress}</p>
            </div>
            <div>
              <h2 className='font-bold'>Payment Method</h2>
              <p className='text-muted-foreground'>{paymentMethod}</p>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>

      <CardContent>
        <div className='flex flex-col gap-4'>
          {lines.map((line) => (
            <div
              key={line.id}
              className='flex items-center gap-3'
            >
              <div className='relative h-16 w-16 overflow-hidden rounded-md bg-gray-200'>
                <img
                  src={line.productVariant?.image || ''}
                  className='object-cover'
                />
              </div>
              <div className='flex-1 space-y-1'>
                <h4 className='font-medium'>{line.name}</h4>
                <p className='text-sm text-muted-foreground'>
                  x{line.quantity}
                </p>
              </div>
              <div className='font-medium'>₹{line.lineTotal}</div>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className='border-t border-border flex flex-col sm:flex-row justify-between gap-2'>
        <div className='flex flex-col sm:flex-row gap-1 sm:gap-4 text-sm text-muted-foreground'>
          <div className='flex items-center gap-1'>
            <Store className='h-4 w-4' />
            <span>{shop.name}</span>
          </div>
          <div className='flex items-center gap-1'>
            <Clock className='h-4 w-4' />
            <span>
              {new Date(createdAt).toLocaleString('en-IN', {
                year: '2-digit',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })}
            </span>
          </div>
        </div>
        <div className='flex items-center justify-between sm:justify-end w-full sm:w-auto gap-2'>
          <span className='text-sm font-medium sm:hidden'>Total:</span>
          <span className='text-lg font-bold'>₹{totalAmount}</span>
        </div>
      </CardFooter>
    </Card>
  );
};
