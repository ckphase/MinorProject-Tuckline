import express from 'express';
import { isAuthenticated, isAdmin } from '../middleware.js';

const router = express.Router();

router.get('/dashboard', isAuthenticated, isAdmin, (req, res) => {
  res.render('admin/dashboard', { user: req.session.user });
});

export default router;
