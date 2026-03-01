import express from 'express'
import {registerUser} from '../controllers/registerUser.js'
import { registerValidation } from '../middlewares/validators/registerValidation.js'
import { loginUser } from '../controllers/loginUser.js'
import { loginValidation } from '../middlewares/validators/loginValidation.js'
import asyncHandler from '../utils/asyncHandler.js'


const router = express.Router()

router.post("/register", registerValidation, asyncHandler(registerUser))

router.post("/login",loginValidation, asyncHandler(loginUser))

export default router