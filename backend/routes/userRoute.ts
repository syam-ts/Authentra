import express from 'express'
const router = express.Router()
import {test, updateUser, deleteUser, adminUsers, adminEdit } from '../controllers/userCtrl.js'
import { verifyToken } from '../utils/verifyUser.js'




router.get('/',test)
router.post('/update/:id', verifyToken, updateUser)  
router.delete('/delete/:id', verifyToken, deleteUser)  

router.get('/admin/users', adminUsers)  
router.get('/admin/admin-edit/:id', adminEdit)  

export default router