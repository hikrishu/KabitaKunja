import Poem from '../models/poem.js'
import AppError from '../utils/appError.js'


export const createPoem = async (req,res,next)=> {
    const poem = await Poem.create({
        ...req.body,
        author: req.user.id
    })
    res.status(201).json({
        success:true,
        data: poem
    })
}

// get all poems

export const getAllPoems = async (req,res,next)=> {

    const filter = {}

    // public can only see published poems
    if(!req.user || req.user.role !== 'admin'){
        filter.status = 'published'
    }

    // filter with tags: /poems?tags=love,memory

    if(req.query.tags){
        const tags = req.query.tags.split(",")
        filter.tags = {$in: tags}
    }

    //admin or user profile page

    if(req.query.user){
        filter.author = req.query.user
    }

    //pagination

    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 5
    const skip = (page-1)*limit



    const poems = await Poem.find(filter)
                .populate("author", "name email")
                .sort({createdAt: -1})
                .skip(skip)
                .limit(limit)

    const total = await Poem.countDocuments(filter)

    res.status(200).json({
        success:true,
        count: poems.length,
        data: poems,
        page,
        totalPages: Math.ceil(total/limit),
        totalResults: total,
        count: poems.length
    })
}


//get one poem

export const getPoemById = async (req,res,next)=> {

    const poem = await Poem.findById(req.params.id).populate("author", "name email")

    //checking poem 
    if(!poem) {
        return next(new AppError("Poem not found.", 404))
    }

    //checking for admin/user can see non-published poems

    if(poem.status !== 'published' && (!req.user || (poem.author._id.toString() !== req.user.id && req.user.role !== 'admin'))){
        return next(new AppError("Not authorized to view this poem", 403))

    }

    res.status(200).json({
        success:true,
        data:poem
    })
}


export const updatePoem = async (req,res,next)=> {
    const poem = await Poem.findById(req.params.id)

    //checking poem
    if(!poem){
        return next(new AppError("Poem not found.", 404))
    }

    //ownership check

    if(poem.author.toString() !== req.user.id && req.user.role !== 'admin'){
        return next(new AppError("Not authorized", 403))
    }

    const allowedFields = ["title", "content", "tags", "status"]

    allowedFields.forEach(field => {
        if(req.body[field] !== undefined){    //putting req.body info to poem obj each element.
            poem[field] = req.body[field]
        }
    })

     
    await poem.save()

    res.status(200).json({
        success:true,
        message:"Poem is updated.",
        data: poem
    })
}



export const deletePoem = async (req,res,next)=> {
    const poem = await Poem.findById(req.params.id)

    //checking poem
    if(!poem){
        return next(new AppError("Poem not found.", 404))
    }

    //ownership check

    if(poem.author.toString() !== req.user.id && req.user.role !== 'admin'){
        return next(new AppError("Not authorized", 403))
    }

    await poem.deleteOne()

    res.status(204).json()
}





