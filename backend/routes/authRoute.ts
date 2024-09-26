import express from 'express'
const router = express.Router()
import { google, signin, signup, signout, adminLogin } from '../controllers/authCtrl.js'

router.post('/signup',signup)
router.post('/signin',signin)
router.post('/google',google)
router.post('/signout',signout)
// router.post('/admin/login',adminLogin)

export default router