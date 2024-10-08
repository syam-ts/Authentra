import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';


export const verifyToken = (req: any, res: any, next: any) => {
    const token = req.cookies.access_token;
    if (!token) return next(errorHandler(401, 'You are not authenticated!'));
    jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
        if (err) return next(errorHandler(403, 'Token is not valid!'));
        req.user = user;
        next();
    });
}