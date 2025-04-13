import { Router } from 'express';
import { createOrder, getOrders } from '../controllers/order.controller';
import { validate } from '../middleware/validate';
import { orderValidator } from '../validators/order.validators';

const router = Router();

router.get('/', getOrders);
router.post('/create', validate(orderValidator), createOrder);

export { router as orderRoutes };
