import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/userRoute.js'
import authRouter from './routes/authRoute.js'
import { response, request } from 'express'
dotenv.config()

const mongoURI = process.env.MONGO

if(!mongoURI) {
    throw new Error('Mongo db error')
}


mongoose.connect(mongoURI)
.then(() => {
    console.log('Connected to MongoDB')
})
.catch((err) => {
    console.log(err)
})

                   
const app = express()
const PORT: number = 3000
app.use(express.json())

app.listen(PORT,() => {

    console.log('server running on port 3000')
})

app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)


app.use((err: any, req: any, res: any, next: any) => {
    const statusCode = err.statusCode || 500  
    const message = err.message || 'Internal Server Error'
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    })
})