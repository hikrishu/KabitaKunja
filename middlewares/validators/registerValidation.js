import Joi from 'joi'
import AppError from '../../utils/appError.js'



export const registerValidation = (req,res,next) => {
        const schema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required(),
            confirmPassword: Joi.ref('password')
        })

        const {error, value} = schema.validate(req.body)
        if(error) {
            return next(new AppError(error.details[0].message, 400))
            
        }
        req.body = value
        next()
}
