import { Router } from 'express';
import { getAllCategories } from '../controllers/shop.controller';

const router = Router();

router.get('/categories', getAllCategories);

export { router as shopRoutes };
