
import mongoose,{Schema, model} from 'mongoose' 
import bcrypt from 'bcryptjs'; 
import jwt from 'jsonwebtoken'; 


const adminSchema = new Schema({
    username : {
        type:String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},

{
    timestamps:true 
}

)

adminSchema.pre('save', async function(next){
    if(!this.isModified('password'))
    {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 10);
    return next();

})

adminSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare( password, this.password );
}

export const Admin = model('Admin', adminSchema);

