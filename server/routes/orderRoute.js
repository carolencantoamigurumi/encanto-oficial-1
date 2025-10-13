import express from 'express'
import { placeOrderPix } from '../controllers/orderController.js'
import MPWebhook from '../controllers/mercadoPagoWebhook.js'


const orderRouter = express.Router()

orderRouter.post('/pix', placeOrderPix)
orderRouter.post('/webhook/mercadopago', MPWebhook)

export default orderRouter
