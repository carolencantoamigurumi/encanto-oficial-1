import express from 'express'
import { addToCart, getUserCart, updateCart } from '../controllers/cartController.js'
import { protectUser } from '../middlewares/Auth.js'



const cartRouter = express.Router()

cartRouter.post('/add', protectUser, addToCart)
cartRouter.post('/update', protectUser, updateCart)
cartRouter.get('/get', protectUser, getUserCart)

export default cartRouter