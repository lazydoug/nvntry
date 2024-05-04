import Router from 'express'
import { body } from 'express-validator'
import passport from 'passport'

import validationHandler from '../handlers/validation.handler.js'
import adminController from '../controllers/admin.controller.js'

const router = Router()

router.post(
  '/auth/signup',
  body('email')
    .exists()
    .withMessage('Email is required')
    .trim()
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Email is not valid'),

  body('password')
    .exists()
    .withMessage('Password is required')
    .trim()
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),

  validationHandler,
  adminController.signup
)

router.post(
  '/auth/login',
  body('email')
    .exists()
    .withMessage('Email is required')
    .trim()
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Email is not valid'),

  body('password')
    .exists()
    .withMessage('Password is required')
    .trim()
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),

  validationHandler,
  adminController.login
)

router.post(
  '/create-patron',
  passport.authenticate('admin-strategy', { session: false }),

  body('name')
    .exists()
    .withMessage('The name of the patron is required')
    .trim()
    .notEmpty()
    .withMessage('Patron name cannot be empty'),

  body('product')
    .exists()
    .withMessage('Product is requied')
    .trim()
    .notEmpty()
    .withMessage('Product name cannot be empty'),

  validationHandler,
  adminController.createPatron
)

export default router
