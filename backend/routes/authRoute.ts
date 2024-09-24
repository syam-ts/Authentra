import express from 'express'
const router = express.Router()
import { google, signin, signup, signout } from '../controllers/authCtrl.js'

router.post('/signup',signup)
router.post('/signin',signin)
router.post('/google',google)
router.post('/signout',signout)

export default router