import User from '../models/user.js'
import AppError from '../utils/appError.js'
import bcrypt from 'bcryptjs'


export const createUser = async (req,res,next)=> {

    const hashPassword = await bcrypt.hash(req.body.password, 10)

    const user = await User.create({
        ...req.body,
        password: hashPassword
    
    })
    res.status(201).json({
        success:true,
        message:"User is created",
        data:user
    })
}

export const getAllUser = async (req,res,next)=> {
    const users = await User.find()
    
    res.status(200).json({
        success:true,
        count:users.length,
        data:users 
    })
}
export const getUserById = async (req,res,next)=> {
    console.log(req.params)
    
    const user = await User.findById(req.params.id)
    if(!user){
        throw new AppError("User not found", 404)
    }
    
    res.status(200).json({
        success:true,
        data:user 
    })
}
export const updateUser = async (req,res,next)=> {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        returnDocument: "after",
        runValidators: true
    })

    if(!user){
        throw new AppError("User not found", 404)
    }
    
    res.status(200).json({
        success:true,
        message: "User is updated",
        data:user 
    })
}
export const deleteUser = async (req,res,next)=> {
    const user = await User.findByIdAndDelete(req.params.id)
    if(!user){
        throw new AppError("User not found", 404)
    }
    
    res.status(204).json()
}

