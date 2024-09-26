import { Request, Response} from 'express'
import { errorHandler } from '../utils/error.js' 
import User from "../models/userModel.js"
import bcryptjs from 'bcryptjs'

export const test = (req: Request, res: Response) => {
    res.json({
        message:"First Api"
    })
  }
 
    export const updateUser = async (req: Request, res: Response, next: any) => {
      try {
        const { id } = req.params
        console.log('The params : ', id)
        const { username, email, password, profilePicture } = req.body;
    
        if (password) {
          req.body.password = bcryptjs.hashSync(password, 10);
        }
    
        const updatedUser: any = await User.findByIdAndUpdate(id, {
          $set: {
            username,
            email,
            password,
            profilePicture,
          },
        }, { new: true });
    
        if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        const { password: _, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
      } catch (error) {
        next(error);
      }
    };


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
        const users = await User.find().lean();
        res.status(200).json(users);
      } catch (error) {
        next(error);
      }
    }


  
    export const adminEdit = async (req: any, res: any, next: any) => {
      try {
        const { id } = req.params
        const user = await User.findById(id)
        if (!user) {
          res.status(404).json({ message: 'User not found' })
        } else {
          res.status(200).json(user)
        }
      } catch (error) {
        next(error)
      }
    }

