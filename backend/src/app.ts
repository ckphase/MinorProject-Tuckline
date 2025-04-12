import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';

import { authRoutes } from './routes/auth.routes';
import { shopRoutes } from './routes/shop.routes';
import { adminRoutes } from './routes/admin.routes';

dotenv.config();

const app = express();

app.use(express.json());

app.use(
  session({
    secret: process.env.SECRET_KEY || 'default_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    },
  })
);

app.use('/api/auth', authRoutes);
app.use('/api/shop', shopRoutes);
app.use('/api/admin', adminRoutes);

export { app };
