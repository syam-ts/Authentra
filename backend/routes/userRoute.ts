import express from 'express'
const router = express.Router()
import {test } from '../controllers/userCtrl.js'




router.get('/',test)

export default router