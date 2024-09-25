import { Request, Response} from 'express'
import { errorHandler } from '../utils/error.js' 
import User from "../models/userModel.js"
import bcryptjs from 'bcryptjs'

export const test = (req: Request, res: Response) => {
    res.json({
        message:"First Api"
    })
  }
 
    export const updateUser = async (req: any, res: any, next: any) => {

      
      try {
        if (req.body.password) {
          req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }
        const updatedUser: any = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: {
              username: req.body.username,
              email: req.body.email,
              password: req.body.password,
              profilePicture: req.body.profilePicture,
            },
          },
          { new: true }
        );
        const { password, ...rest } = updatedUser._doc
        res.status(200).json(rest)
      } catch (error) {
        next(error)
      }
    }


    export const deleteUser = async (req: any, res: any, next: any) => {

      try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('User has been deleted...');
      } catch (error) {
        next(error);
      }
    
    }


    //admin

    export const adminUsers = async (req: any, res: any, next: any) => {

      try {
        const users = await User.find()
        res.status(200).json(users)
      } catch (error) {
        next(error)
      }
    }
    