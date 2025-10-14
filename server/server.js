import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from './inngest/index.js'
import connectCloudinary from './configs/cloudinary.js'
import productRouter from './routes/productRoute.js'
import adminRouter from './routes/adminRoute.js'
import userRouter from './routes/userRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'


const app = express()
const port = 3000

await connectDB()
await connectCloudinary()

// Middleware
app.use(express.json())
app.use(cors({
    origin: "https://encantooficial-client.vercel.app",
    credentials: true,
}))
app.use(clerkMiddleware())


// API routes
app.get('/', (req, res) => res.send('Servidor online!') )
app.use('/api/inngest', serve({ client: inngest, functions }))
app.use('/api/admin', adminRouter)
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)



app.listen(port, () => console.log(`Servidor rodando na porta: ${port}`))