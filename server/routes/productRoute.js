import express from 'express'
import upload from '../configs/multer.js'
import { addProduct, ebookProduct, editProduct, listProducts, removeProduct, singleProduct } from '../controllers/productController.js'
import { protectAdmin } from '../middlewares/adminAuth.js'


const productRouter = express.Router()

productRouter.post('/add', protectAdmin, upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
    { name: "ebookFile", maxCount: 1 },
]), addProduct)

productRouter.get('/list', listProducts)
productRouter.post('/remove', protectAdmin, removeProduct)
productRouter.put('/edit', protectAdmin, editProduct)
productRouter.get('/id', singleProduct)
productRouter.get('/download/:productId', ebookProduct)


export default productRouter