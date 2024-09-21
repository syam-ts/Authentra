import { Request, Response } from "express"
import User from "../models/userModel.js"
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utiils/error.js"
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
    if(!validUser) return next(errorHandler(404, 'Invalid credentials'))
    const validPassword = bcryptjs.compareSync(password, validUser.password)
    if(!validPassword) return next(errorHandler(401, 'wrong credentials'))
   
      const token = jwt.sign({ id: validUser._id}, process.env.JWT_SECRET as string)
      const { password: hashedPassword, ...rest } = validUser.toObject()
      const expiryDate = new Date(Date.now() + 3600000)
      res.cookie('access_token',
         token, { httpOnly: true, 
          expires: expiryDate
         })
      .status(200).json(rest)
  }catch(err: any){

    next(err)
  }
}