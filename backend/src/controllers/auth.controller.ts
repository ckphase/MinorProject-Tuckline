import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import prisma from '../config/db';

export const register = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    res.status(400).json({ error: 'User with email already exists' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    req.session.userId = user.id;
    res.status(201).json({
      message: 'User registered',
      user: { id: user.id, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(400).json({
      error: 'Failed to register user',
      message: (err as Error).message,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    res.status(400).json({ error: 'Invalid email or password' });
    return;
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    res.status(400).json({ error: 'Invalid email or password' });
    return;
  }

  req.session.userId = user.id;
  res.json({
    message: 'Logged in',
    user: { id: user.id, email: user.email, role: user.role },
  });
};

export const logout = (req: Request, res: Response) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out' });
  });
};
