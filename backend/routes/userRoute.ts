import express from 'express'
const router = express.Router()
import {test, updateUser, deleteUser, adminUsers } from '../controllers/userCtrl.js'
import { verifyToken } from '../utils/verifyUser.js'




router.get('/',test)
router.post('/update/:id', verifyToken, updateUser)  
router.delete('/delete/:id', verifyToken, deleteUser)  
router.get('/admin/users', adminUsers)  

export default router