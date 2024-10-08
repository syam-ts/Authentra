import { Request, Response } from "express"
import User from "../models/userModel.js"
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js"
import jwt from 'jsonwebtoken' 



export const signup = async (req: Request, res: Response) => {
 
  const { username, email, password } = req.body

  const hashedPassword = bcryptjs.hashSync(password, 10)
  const newUser = new User({ 
    username,
    email,
    password: hashedPassword 
  })

  await newUser.save()
  res.status(201).json({ message: "User created successfully!" })
}


export const signin = async ( req: Request, res: Response, next: any ) => {
  const {email, password} = req.body
  try{

    const validUser = await User.findOne({ email })
    if(!validUser) return next(errorHandler(404, 'User not found'))
    const validPassword = bcryptjs.compareSync(password, validUser.password)
    if(!validPassword) return next(errorHandler(401, 'wrong credentials'))
   
      const token = jwt.sign({ id: validUser._id}, process.env.JWT_SECRET as string)
      const { password: hashedPassword, ...rest } = validUser.toObject()
      const expiryDate = new Date(Date.now() + 3600000)
      res.cookie('access_token',
         token, { 
          httpOnly: true, 
          expires: expiryDate
         })
      .status(200).json(rest)
  }catch(err: any){

    next(err)
  }
}

export const google = async (req: Request, res: Response, next: any) => {
  try{
    const user = await User.findOne({email: req.body.email})
    if (user) {
      const token = jwt.sign({id: user._id}, process.env.JWT_SECRET as string )
      const{ password: hashedPassword, ...rest} = user.toObject()
      const expiryDate = new Date(Date.now() + 3600000)
      res.cookie('acess_token', token , {
         httpOnly: true,
        expires: expiryDate
      }).status(200).json(rest)
    } else {
       const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8) //last 8 number will be slice
       
       const hashedPassword = bcryptjs.hashSync(generatePassword, 10)

       const newUser = new User({
        username: req.body.name.split(' ').join('').toLowerCase() + Math.floor(Math.random() * 10000).toString(),
        email: req.body.email, 
        password: hashedPassword,
        profilePicture: req.body.photo
        })
        await newUser.save()

        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET as string )
        const{ password: hashedPassword2, ...rest} = newUser.toObject()
        // const{ password: hashedPassword, ...rest} = user._doc
        const expiryDate = new Date(Date.now() + 3600000)
        res.cookie('acess_token', token , {
           httpOnly: true,
          expires: expiryDate
        }).status(200).json(rest)
    }
  }catch(err: any) {

  }
}


export const signout = (req: any, res: any) => {
  res.clearCookie('access_token').status(200).json('Signout success!')
}


//admin login

export const adminLogin = (req: any, res: Response) => {
 
  const usernameA: string = 'adminau';
  const passwordA: string = 'admin123';

  try {
    console.log(req.body); 

      if (req.body.username === usernameA && req.body.password === passwordA) { 
        res.redirect('http://localhost:5173/admin') 
 
    } else {
      console.log('Wrong credentials');
      res.status(401).send('Invalid credentials') 
    }
  } catch (err: any) {
    console.error(err);
    }
}