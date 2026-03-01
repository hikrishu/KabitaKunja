import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import AppError from '../utils/appError.js'


export const protect = async (req,res,next)=> {
    let token
    let decoded

    //get token from header
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1]
    }

    //token exist or not
    if(!token){
        return next(new AppError("No token, not authorized.", 401))
    }


    //verify token
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)

    } catch (error) {
        return next(new AppError("Token invalid or expired.", 401))
    }
    //finding user data

    const user = await User.findById(decoded.id)
    if(!user){
        return next(new AppError("User no longer exist.", 401))
    }
    //attach to req

    req.user = user

    console.log("protect runs.")
    next()
    
    


}