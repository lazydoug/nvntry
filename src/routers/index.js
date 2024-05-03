import Router from 'express'

import adminRoutes from './admin.routes.js'
import patronRoutes from './patron.routes.js'
import productRoutes from './product.routes.js'

const router = Router()

router.use('/admin', adminRoutes)
router.use('/patron', patronRoutes)
router.use('/products', productRoutes)

export default router
