import express from 'express';
import bcrypt from 'bcrypt';

import { prisma } from '../config/db.js';

const router = express.Router();

// GET
router.get('/login', (req, res) => res.render('auth/login'));

router.get('/register', (req, res) => {
  res.render('auth/register');
});

// POST
router.post('/register', async (req, res) => {
  const { email, password, role, name } = req.body;
  if (!email || !password || !role || !name) {
    return res.send('All fields are required.');
  }

  const existingUser = await prisma.user.findFirst({
    where: { email },
  });
  if (existingUser) {
    return res.send('User with that email already exists.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });

  req.session.user = newUser;
  res.redirect(role === 'admin' ? '/admin/dashboard' : '/shop');
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.send('All fields are required.');
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    return res.send('Invalid credentials');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.send('Invalid credentials');
  }

  req.session.user = user;
  res.redirect(user.role === 'admin' ? '/admin/dashboard' : '/shop');
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});

export default router;
