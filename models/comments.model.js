
import mongoose,{ Schema, model } from 'mongoose'

const commentSchema = new Schema({
    text:{
        type:String,    
        required:true 
    },
    authorId:{
        type:String,
        required:true  
    },
    postId:{
        type:String,
        required:true 
    }
},
    {
        timestamps:true 
    }
)

export const Comment = model('Comment', commentSchema);