import { Router } from 'express';
import {
  cancleOrder,
  createOrder,
  getOrders,
  updateOrder,
} from '../controllers/order.controller';
import { validate } from '../middleware/validate';
import {
  createOrderValidator,
  updateOrderValidator,
} from '../validators/order.validators';

const router = Router();

router.get('/', getOrders);
router.post('/create', validate(createOrderValidator), createOrder);
// for admin (shop owner) only
router.patch('/:id', validate(updateOrderValidator), updateOrder);
// for customers
router.patch('/cancel/:id', cancleOrder);

export { router as orderRoutes };
