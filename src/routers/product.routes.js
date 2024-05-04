import Router from 'express'
import { body, param } from 'express-validator'
import passport from 'passport'

import validationHandler from '../handlers/validation.handler.js'
import {
  createProduct,
  updateInventory,
  getAllProducts,
} from '../controllers/product.controller.js'
import '../authentication/strategy.authentication.js'

const router = Router()

router.get(
  '/',
  passport.authenticate('admin-strategy', { session: false }),
  getAllProducts
)

router.post(
  '/new',
  passport.authenticate('admin-strategy', { session: false }),

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
  '/:id',
  passport.authenticate('admin-strategy', { session: false }),

  param('id')
    .trim()
    .isHexadecimal()
    .withMessage('Invalid product')
    .isLength({ min: 24, max: 24 })
    .withMessage('Invalid product'),

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
