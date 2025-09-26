import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from './inngest/index.js'


const app = express()
const port = 3000

await connectDB()


// Middleware
app.use(express.json())
app.use(cors())
app.use(clerkMiddleware())


// API routes
app.get('/', (req, res) => res.send('Servidor online!') )
app.use('/api/inngest', serve({ client: inngest, functions }))



app.listen(port, () => console.log(`Servidor rodando na porta: ${port}`))