import express from 'express';
import { isAuthenticated, isCustomer } from '../middleware.js';
import { prisma } from '../config/db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const categories = await prisma.category.findMany();
  res.render('shop/index', { user: req.session.user, categories });
});

router.get('/shop/portal', isAuthenticated, isCustomer, (req, res) => {
  res.render('shop/customer', { user: req.session.user });
});

export default router;
