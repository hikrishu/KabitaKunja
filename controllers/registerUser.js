import bcrypt from 'bcryptjs'
import AppError from '../utils/appError.js'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

export const registerUser = async (req,res,next)=> {
    const {name, email, password} = req.body

    //checking for existing account
    const existingUser = await User.findOne({email})
    if(existingUser){
        throw new AppError("User already registered.", 400)
    }

    //hashing password
    const hashPassword = await bcrypt.hash(password, 10)

    //create user

    const user = await User.create({
        name,
        email,
        password: hashPassword
    })

    //generate token

    const token = jwt.sign({id:user._id, role:user.role},
        process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN}
    )

    //send res

    res.status(201).json({
        success:true,
        user: {id:user._id, name:user.name, email:user.email},
        token
    })
}
