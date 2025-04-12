import express from 'express';
import session from 'express-session';
import cors from 'cors';
import dotenv from 'dotenv';

import { authRoutes } from './routes/auth.routes';
import { shopRoutes } from './routes/shop.routes';
import { adminRoutes } from './routes/admin.routes';
import { requireAuth } from './middleware/auth';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
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

app.get('/api/me', requireAuth, (req, res) => {
  res.json({ user: req.user });
});

export { app };
