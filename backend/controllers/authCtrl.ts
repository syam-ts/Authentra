import { Request, Response} from 'express'
import User from '../models/userModel.js'

export const signup = async (req: Request, res: Response) => {
    const {userName, email, password} = req.body
    const newUser = new User({userName, email, password})
     await newUser.save()
     res.status(201).json({message: "User creted successfully!"})
}