import mongoose from "mongoose"

const poemSchema = new mongoose.Schema({
    title: {type:String, required:true},
    poem_image: {type:String},
    content: {type:String, required:true},
    author: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: "true"
    },
    tags: {
        type: [String],
        default: []
    },
    status: {
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'draft'
    }

}, {timestamps:true})

export default mongoose.model("Poem", poemSchema)