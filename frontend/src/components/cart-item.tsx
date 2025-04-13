import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { CartItem as CartItemProps } from '@/lib/store/order-store';

export const CartItem = ({
  image,
  name,
  price,
  quantity,
  onQuantityMinus,
  onQuantityPlus,
  onRemove,
}: CartItemProps & {
  onQuantityMinus: () => void;
  onQuantityPlus: () => void;
  onRemove: () => void;
}) => {
  return (
    <div className='flex items-start gap-4'>
      <img
        src={image}
        alt={name.slice(0, 5)}
        className='w-16 h-16 shrink-0 object-cover rounded-md border border-border'
      />
      <div className='w-full flex flex-col gap-2'>
        <div className='flex w-full justify-between'>
          <span>{name}</span>
          <span>₹{(price * quantity).toFixed(2)}</span>
        </div>
        <div className='flex w-full justify-between'>
          <div className='flex items-center border border-border rounded-full'>
            <Button
              variant='ghost'
              size='sm'
              onClick={onQuantityMinus}
            >
              <Minus />
            </Button>
            <span className='text-sm'>{quantity}</span>
            <Button
              variant='ghost'
              size='sm'
              onClick={onQuantityPlus}
            >
              <Plus />
            </Button>
          </div>
          <Button
            variant='ghost'
            size='icon'
            onClick={onRemove}
          >
            <Trash2 className='text-destructive' />
          </Button>
        </div>
      </div>
    </div>
  );
};
