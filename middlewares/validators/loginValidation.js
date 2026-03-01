import Joi from 'joi'
import AppError from '../../utils/appError.js'

export const loginValidation = (req,res,next)=> {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required().min(8)
    })

    const {error, value} = schema.validate(req.body)
    if(error) {
        return next(new AppError(error.details[0].message, 400))
            
    }

    req.body=value
    next()
}