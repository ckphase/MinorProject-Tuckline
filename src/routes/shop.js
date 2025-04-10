import express from 'express';
import { isAuthenticated, isCustomer } from '../middleware.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('shop/index', { user: req.session.user });
});

router.get('/shop/portal', isAuthenticated, isCustomer, (req, res) => {
  res.render('shop/customer', { user: req.session.user });
});

export default router;
