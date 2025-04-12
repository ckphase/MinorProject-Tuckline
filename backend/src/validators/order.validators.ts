import { body } from 'express-validator';

export const orderValidator = [
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
];
