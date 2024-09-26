var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/userRoute.js';
import authRouter from './routes/authRoute.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
dotenv.config();
const mongoURI = process.env.MONGO;
if (!mongoURI) {
    throw new Error('MongoDB connection string not found');
}
mongoose.connect(mongoURI);
process.on('SIGINT', () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose.connection.close();
    console.log('MongoDB connection closed due to app termination');
    process.exit(0);
}));
const app = express();
const PORT = 3005;
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
//server
app.listen(PORT, () => {
    console.log('server running on port 3005');
});
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    });
});
