
import mongoose,{model, Schema} from "mongoose";

const contactSchema = new Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true 
    },
    message:{
        type:String
    }
},
    {
        timestamps:true 
    }
)

export const Contact = new model('Contact', contactSchema);

