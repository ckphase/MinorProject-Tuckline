import { Router } from 'express';
import { getDashboardMetrics } from '../controllers/admin.controller';
import { getTotalOrdersCount } from '../controllers/order.controller';

const router = Router();

router.get('/dashboard', getDashboardMetrics);
router.get('/dashboard/order-count', getTotalOrdersCount);

export { router as adminRoutes };
