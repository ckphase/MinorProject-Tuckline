import { ProductVariant } from '@/types';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { useProductPreviewStore } from '@/lib/store/product-preview-store';

const calcMinMaxPrice = (prices: { price: string }[]) => {
  return prices.reduce(
    (acc, current) => {
      const price = parseFloat(current.price);
      if (acc.min === 0 || price < acc.min) {
        acc.min = price;
      }
      if (acc.max === 0 || price > acc.max) {
        acc.max = price;
      }
      return acc;
    },
    { min: 0, max: 0 }
  );
};

export const ProductCard = ({
  id,
  prices,
  product,
  name,
  image,
}: ProductVariant) => {
  const { setData } = useProductPreviewStore();

  const price = calcMinMaxPrice(prices);

  return (
    <Card className='pt-0'>
      <img
        src={image || ''}
        alt={name}
        className='object-cover object-top w-full h-48 rounded-t-sm'
      />
      <CardContent className='space-y-4'>
        <div className='space-y-1'>
          <h3 className='text-2xl font-semibold tracking-tight'>{name}</h3>
          <p className='text-sm text-muted-foreground'>{product.description}</p>
        </div>
        <div className='flex justify-between'>
          <p className='text-primary font-bold text-xl'>
            ₹{price.min} - ₹{price.max}
          </p>
          <Button
            onClick={() => {
              setData({
                id,
                name,
                image: image || '',
                prices,
              });
            }}
          >
            Preview
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
