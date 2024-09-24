import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/userRoute.js'
import authRouter from './routes/authRoute.js'
import bodyParser from 'body-parser'
import { Response, Request } from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser'
import path from 'path'

dotenv.config()

const mongoURI = process.env.MONGO

if(!mongoURI) {
    throw new Error('Mongo db error')
}
 

mongoose.connect( mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const PORT: number = 3000
 
const __dirname = path.resolve()
const app = express()
app.use(express.static(path.join(__dirname, '/cliend/dist')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})

app.use(express.json())
app.use(cors());
app.use(bodyParser.json())
app.use(cookieParser())


//server
app.listen(PORT,() => {

    console.log('server running on port 3000')
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