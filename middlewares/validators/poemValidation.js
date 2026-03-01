import Joi from 'joi'
import AppError from '../../utils/appError.js'


export const poemCreateValidation = (req,res,next)=> {
    const schema = Joi.object({
            title: Joi.string().min(4).max(20).required(),
            poem_image: Joi.string(),
            content: Joi.string().min(10).required(),
            tags: Joi.array().items(Joi.string()).optional(),
            status: Joi.string().valid("draft", "published").optional()
    })

    const {error, value} = schema.validate(req.body)
    if(error) {
            return next(new AppError(error.details[0].message, 400))
                
        }

    req.body = value
    next()
}
export const poemUpdateValidation = (req,res,next)=> {
    const schema = Joi.object({
            title: Joi.string().min(4).max(20),
            poem_image: Joi.string(),
            content: Joi.string().min(10),
            tags: Joi.array().items(Joi.string()),
            status: Joi.string().valid("draft", "published")
    })

    const {error, value} = schema.validate(req.body)
    if(error) {
            return next(new AppError(error.details[0].message, 400))
                
        }

    req.body = value
    console.log("poem update validation runs.")
    next()
}
