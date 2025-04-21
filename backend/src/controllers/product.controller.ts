import { Request, Response } from 'express';
import prisma from '../config/db';

export const getAllProductVariants = async (req: Request, res: Response) => {
  const isAdmin = req.user?.role === 'admin';
  if (!isAdmin) {
    res.status(403).json({ message: 'Forbidden' });
    return;
  }

  const productVariants = await prisma.productVariant.findMany({
    include: {
      prices: {
        include: {
          shop: true,
        },
      },
    },
  });

  const filteredVariants = productVariants.map((variant) => {
    variant.prices = variant.prices.filter(
      (price) => price.shop.ownerId === req.user?.id
    );
    return {
      ...variant,
      prices: variant.prices.map((price) => ({
        id: price.id,
        price: price.price,
      })),
    };
  });

  res.status(200).json({ productVariants: filteredVariants });
};
