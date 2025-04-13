import { Router } from 'express';
import {
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
router.patch('/:id', validate(updateOrderValidator), updateOrder);

export { router as orderRoutes };
