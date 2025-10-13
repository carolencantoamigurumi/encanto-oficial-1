import express from 'express'
import { protectAdmin } from '../middlewares/adminAuth.js'
import { getAllOrders, getAllUsers, getDashboardData, isAdmin, removeUserAdmin, setUserAsAdmin } from '../controllers/adminController.js'


const adminRouter = express.Router()

adminRouter.get('/is-admin', protectAdmin, isAdmin)
adminRouter.post('/set-admin', protectAdmin, setUserAsAdmin)
adminRouter.post('/remove-admin', protectAdmin, removeUserAdmin)
adminRouter.get('/clients', protectAdmin, getAllUsers)
adminRouter.get('/dashboard', protectAdmin, getDashboardData)
adminRouter.get('/all-orders', protectAdmin, getAllOrders)

export default adminRouter