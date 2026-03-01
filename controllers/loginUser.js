import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import AppError from '../utils/appError.js'

export const loginUser = async (req,res,next) => {
    const {email, password} = req.body

    //checking email 
    const user = await User.findOne({email})
    if(!user){
        throw new AppError("You are not registerd.", 401)
    }
    //comparing password

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        throw new AppError("You are not registerd.", 401)
    }
    //generate token

    const token = jwt.sign({id:user._id, role:user.role},
        process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})

    //sending back response

    res.status(200).json({
        success:true,
        user: {id:user._id,
        name:user.name,
        email:user.email},
        token
    })
}