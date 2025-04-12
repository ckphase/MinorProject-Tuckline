import { Request, Response } from 'express';
import prisma from '../config/db';

export const getAllCategories = async (req: Request, res: Response) => {
  const catagories = await prisma.category.findMany();

  res.status(200).json({ catagories });
};
