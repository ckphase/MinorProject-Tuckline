import { Router } from 'express';
import {
  getAllCategories,
  getAllProducts,
} from '../controllers/shop.controller';

const router = Router();

router.get('/categories', getAllCategories);
router.get('/products', getAllProducts);

export { router as shopRoutes };
