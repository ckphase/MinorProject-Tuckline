import { body } from 'express-validator';

export const createOrderValidator = [
  body('items')
    .isArray({ min: 1 })
    .withMessage('Cart must be a non-empty array of items'),

  body('items.*.id')
    .isInt({ gt: 0 })
    .withMessage('Product variant ID must be a positive integer'),

  body('items.*.name').isString().withMessage('Item name must be a string'),

  body('items.*.price')
    .isFloat({ gt: 0 })
    .withMessage('Price must be a positive number'),

  body('items.*.quantity')
    .isInt({ gt: 0 })
    .withMessage('Quantity must be a positive integer'),

  body('items.*.shopId')
    .isInt({ gt: 0 })
    .withMessage('Shop ID must be a positive integer'),

  body('shippingAddress')
    .isString()
    .withMessage('Shipping address must be a string'),

  body('paymentMethod')
    .isString()
    .withMessage('Payment method must be a string'),
];

export const updateOrderValidator = [
  body('id')
    .isInt({ gt: 0 })
    .withMessage('Order ID must be a positive integer'),
  body('status')
    .isIn(['pending', 'confirmed', 'delivered', 'cancelled'])
    .withMessage(
      'Status must be one of the following: pending, confirmed, delivered, cancelled'
    ),
];
