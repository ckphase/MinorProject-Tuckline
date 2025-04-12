import { Router } from 'express';
import { createOrder } from '../controllers/order.controller';
import { validate } from '../middleware/validate';
import { orderValidator } from '../validators/order.validators';

const router = Router();

router.post('/create', validate(orderValidator), createOrder);

export { router as orderRoutes };
