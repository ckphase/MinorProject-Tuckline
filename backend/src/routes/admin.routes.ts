import { Router } from 'express';
import { getDashboardMetrics } from '../controllers/admin.controller';
import { getAllProductVariants } from '../controllers/product.controller';
const router = Router();

router.get('/dashboard', getDashboardMetrics);
router.get('/products', getAllProductVariants);
export { router as adminRoutes };

