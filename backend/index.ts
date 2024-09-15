import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

mongoose.connect(process.env.MONGO)
.then(() => {
    console.log('Connected to MongoDB')
})
.catch((err) => {
    console.log(err)
})

console.log('here')
const app = express()
const PORT: number = 3000


app.listen(PORT,() => {

    console.log('server running on port 3000')
})