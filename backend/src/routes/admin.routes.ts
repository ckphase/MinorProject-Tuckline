import { Router } from 'express';
import { getDashboardMetrics } from '../controllers/admin.controller';
import { getTotalOrdersCount } from '../controllers/order.controller';
import { getAllProductVariants } from '../controllers/product.controller';

const router = Router();

router.get('/dashboard', getDashboardMetrics);
router.get('/dashboard/order-count', getTotalOrdersCount);

router.get('/products', getAllProductVariants);

export { router as adminRoutes };
