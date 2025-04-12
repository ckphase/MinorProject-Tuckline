import { Router } from 'express';
import { getDashboardMetrics } from '../controllers/admin.controller';

const router = Router();

router.get('/dashboard', getDashboardMetrics);

export { router as adminRoutes };
