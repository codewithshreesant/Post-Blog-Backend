
import mongoose,{ Schema, model } from 'mongoose' 
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true 
    },
    password:{
        type:String,
        required:true 
    },
    verifyToken:{
        type:String 
    },
    verifyTokenExpiry:{
        type:String 
    },
    isAdmin:{
        type:Boolean,
        default:false 
    }
},

    {
        timeseries:true
    }

)

userSchema.pre('save', async function( next ){
    if( !this.isModified('password') ) return next();
    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.JwtToken = function(){
    return jwt.sign(
        {
            _id : this._id ,
            email : this.email 
        },
        process.env.JWT_TOKEN_SECRET,
        {  
            expiresIn : process.env.JWT_TOKEN_EXPIRY 
        }
    )
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

export const User = model('User', userSchema);