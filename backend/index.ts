import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/userRoute.js'
import authRouter from './routes/authRoute.js'
import bodyParser from 'body-parser'
import { Response, Request } from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser'

dotenv.config()

const mongoURI = process.env.MONGO

if(!mongoURI) {
    throw new Error('Mongo db error')
}
 

mongoose.connect( mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

 

const app = express()
const PORT: number = 5173
app.use(express.json())
app.use(cors());
app.use(bodyParser.json())
app.use(cookieParser())


//server
app.listen(PORT,() => {

    console.log('server running on port 5173')
})

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter) 


app.use((err: any, req: Request, res: Response, next: any) => {
    const statusCode = err.statusCode || 500  
    const message = err.message || 'Internal Server Error'
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    })
})