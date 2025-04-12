import { Request, Response, NextFunction } from 'express';
import prisma from '../config/db';

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.session.userId;
  if (!userId) {
    res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true, role: true },
    });

    if (!user) {
      res.status(401).json({ error: 'User not found' });
    }

    req.user = user;

    next();
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};
