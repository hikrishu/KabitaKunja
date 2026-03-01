import AppError from "../utils/appError.js"

export const authorize = (...roles)=> {
    return (req,res,next)=> {
        // check if req.user exists
        if (!req.user) {
        return next(new AppError("User not found. Authorization failed.", 401))
        }
        
        if(!roles.includes(req.user.role)){
            return next(new AppError("You do not have permission.", 403))
            console.log("authorize runs1.")
        }
        console.log("authorize runs.")
        next()
        
    }
}