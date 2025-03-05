
import mongoose,{ Schema, model } from 'mongoose'

const postSchema = new Schema({
    title:{
        type:String,
        required:true 
    },
    description:{
        type:String,
        required:true 
    },
    image:{
        type:String,
        required:true 
    },
    recommended:{
        type:Boolean,
        default:false
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User' 
    },
    createdAt:{
        type:Date,
        default:Date.now 
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
})

postSchema.pre('save', function (next){
    this.updatedAt = Date.now
    next()
})


export const Post = model('Post', postSchema);