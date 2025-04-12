import { Card, CardContent } from './ui/card';

type ProductCardProps = {
  name: string;
  description: string;
  image: string;
  category: string;
  price: {
    min: number;
    max: number;
  };
};

export const ProductCard = ({
  name,
  description,
  image,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  category,
  price,
}: ProductCardProps) => {
  return (
    <Card className='pt-0'>
      <img
        src={image}
        alt={name}
        className='object-cover object-top w-full h-48 rounded-t-sm'
      />
      <CardContent className='space-y-4'>
        <div className='space-y-1'>
          <h3 className='text-2xl font-semibold tracking-tight'>{name}</h3>
          <p className='text-sm text-muted-foreground'>{description}</p>
        </div>
        <div className='flex justify-between'>
          <p className='text-primary font-bold text-xl'>
            ₹{price.min} - ₹{price.max}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
