import Router from 'express'
import { body, param } from 'express-validator'
import passport from 'passport'

import validationHandler from '../handlers/validation.handler.js'
import {
  login,
  updatePassword,
  updateInventory,
} from '../controllers/patron.controller.js'

const router = Router()

router.patch(
  '/update-password',

  body('name')
    .exists()
    .withMessage('Name is required')
    .trim()
    .notEmpty()
    .withMessage('Name cannot be empty'),

  body('oldPassword')
    .exists()
    .withMessage('Old password is required')
    .trim()
    .notEmpty()
    .withMessage('Old password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),

  body('newPassword')
    .exists()
    .withMessage('New password is required')
    .trim()
    .notEmpty()
    .withMessage('New password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),

  body('confirmPassword')
    .exists()
    .withMessage('Confirm password is required')
    .trim()
    .notEmpty()
    .withMessage('Confirm password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .custom((value, { req }) => {
      return value === req.body.newPassword
    })
    .withMessage('Passwords do not match'),

  validationHandler,
  updatePassword
)

router.post(
  '/login',
  body('name')
    .exists()
    .withMessage('Name is required')
    .trim()
    .notEmpty()
    .withMessage('Name cannot be empty'),

  body('password')
    .exists()
    .withMessage('Password is required')
    .trim()
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),

  validationHandler,
  login
)

router.patch(
  '/:id/inventory',
  passport.authenticate('patron-strategy', { session: false }),

  param('id')
    .trim()
    .isHexadecimal()
    .withMessage('User does not exist')
    .isLength({ min: 24, max: 24 })
    .withMessage('User does not exist'),

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
