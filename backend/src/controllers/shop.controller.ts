import { Request, Response } from 'express';
import prisma from '../config/db';

export const getAllCategories = async (req: Request, res: Response) => {
  const catagories = await prisma.category.findMany();

  res.status(200).json({ catagories });
};

export const getAllProducts = async (req: Request, res: Response) => {
  const products = await prisma.productVariant.findMany({
    include: {
      prices: {
        select: {
          shop: {
            select: { id: true, name: true },
          },
          price: true,
        },
      },
    },
  });

  res.status(200).json({ products });
};
