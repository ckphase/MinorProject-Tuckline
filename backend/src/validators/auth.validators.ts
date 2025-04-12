import { body } from 'express-validator';

export const registerValidator = [
  body('name').optional().isString().withMessage('Name must be a string'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('role').isIn(['admin', 'customer']).withMessage('Invalid role'),
];

export const loginValidator = [
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').notEmpty().withMessage('Password is required'),
];
