import { Request, Response} from 'express'
import User from '../models/userModel.js'
import bcryptjs from 'bcryptjs'

export const signup = async (req: Request, res: Response) => {
    const {username, email, password} = req.body
    const hashedPassword = bcryptjs.hashSync(password, 10)
    const newUser = new User({username, email, password: hashedPassword})
    try{
        await newUser.save()
        res.status(201).json({message: "User creted successfully!"})
    }catch(err: any) {

        res.status(500).json({message: err.message})
    }
   
}