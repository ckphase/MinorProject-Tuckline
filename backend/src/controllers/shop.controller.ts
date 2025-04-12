import { Request, Response } from 'express';
import prisma from '../config/db';

export const getAllCategories = async (req: Request, res: Response) => {
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  res.status(200).json({ categories });
};

export const getAllProducts = async (req: Request, res: Response) => {
  const { q, category } = req.query;

  const products = await prisma.productVariant.findMany({
    where: {
      product: {
        name: q ? { contains: String(q) } : undefined,
        categoryId: category ? Number(category) : undefined,
      },
    },
    include: {
      product: {
        select: {
          category: {
            select: { name: true },
          },
        },
      },
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
