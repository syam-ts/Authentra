import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/userRoute.js'
import authRouter from './routes/authRoute.js'
import adminRouter from './routes/adminRoute.js'
import bodyParser from 'body-parser'
import { Response, Request } from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser'
import session from 'express-session'

dotenv.config()

const mongoURI = process.env.MONGO;

if (!mongoURI) {
    throw new Error('MongoDB connection string not found');
}

mongoose.connect(mongoURI);

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('MongoDB connection closed due to app termination');
    process.exit(0);
});


const app = express()
const PORT: number = 3005

app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,                
  }))
  app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));
  app.use(express.json())

  
app.listen(PORT,() => {

    console.log('server running on port 3005')
})

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter) 
app.use('/api/admin', adminRouter) 


app.use((err: any, req: Request, res: Response, next: any) => {
    const statusCode = err.statusCode || 500  
    const message = err.message || 'Internal Server Error'
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    })
})