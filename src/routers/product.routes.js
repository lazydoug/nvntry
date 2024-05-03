import Router from 'express'
import { body } from 'express-validator'
import passport from 'passport'

import validationHandler from '../handlers/validation.handler.js'
import {
  createProduct,
  updateInventory,
} from '../controllers/product.controller.js'

const router = Router()

router.post(
  '/new',
  passport.authenticate('jwt', { session: false }),

  body('name')
    .exists()
    .withMessage('Product name is required')
    .trim()
    .notEmpty()
    .withMessage('Product name cannot be empty'),

  body('quantity')
    .exists()
    .withMessage('Quantity is required')
    .trim()
    .notEmpty()
    .withMessage('Quantity cannot be empty')
    .isInt({ min: 0 })
    .withMessage('Quantity cannot be less than zero'),

  body('unit_price')
    .exists()
    .withMessage('Unit price is required')
    .trim()
    .notEmpty()
    .withMessage('Unit price cannot be empty')
    .isInt({ gt: 0 })
    .withMessage('Unit price must be greater than zero'),

  validationHandler,
  createProduct
)

router.patch(
  '/:id/inventory',

  body('quantity')
    .exists()
    .withMessage('Quantity is required')
    .trim()
    .notEmpty()
    .withMessage('Quantity cannot be empty')
    .isInt({ min: 0 })
    .withMessage('Quantity cannot be less than zero'),

  validationHandler,
  updateInventory
)

export default router
