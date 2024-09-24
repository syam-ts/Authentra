import express from 'express'
const router = express.Router()
import {test, updateUser } from '../controllers/userCtrl.js'
import { verifyToken } from '../utils/verifyUser.js'




router.get('/',test)
router.post('/update/:id', verifyToken, updateUser)  

export default router