import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/userRoute.js'
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


app.listen(PORT,() => {

    console.log('server running on port 3000')
})

app.use('/server/user', userRouter)