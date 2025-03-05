import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const generateToken = async( userId ) => {
    try {
        const user =  await User.findById({ _id: userId });
        const token = user.JwtToken();
        user.verifyToken = token;
        await user.save({validateBeforeSave:false});
        return { token: token }
    } catch (error) {
        console.log("Error while generating token ", error.messsage);
        throw new ApiError(402, error.message);
    }
}

const passwordCompare = async (userId, password)=>{
    const user = await User.findById({_id:userId});
    const isPasswordCorrect = await user.comparePassword(password);
    console.log("is password correct ", isPasswordCorrect)

    return isPasswordCorrect;
}

const registerUser = asyncHandler(
    async ( req, res, next )=>{
        const { username, email, password } = req.body;
        if (
            [ username, email, password ].some((field)=>{
                return field==""
            })
        ){
            throw new ApiError(
                402,
                " All fields are required ! "
            )
        }

        const isUserExist = await User.find({
            email
        })

        if(
            isUserExist.length > 0
        ){
            throw new ApiError(
                402,
                " User already Exist "
            )
        }
        
        const newUser = await User.create({
            username,
            email,
            password
        })
        
        const user = await newUser.save();

        res.status(
            200
        ).json(
            new ApiResponse(
                200,
                " User Created Successfully ",
                user 
            )
        )
    }
)

const loginUser = asyncHandler(
    async ( req, res, next ) => {
        const { email, password } = req.body;
        if(
            [ email, password ].some((field)=>{
                return field == ""
            })
        ){
            throw new ApiError(
                402,
                "email and password is required ! "
            )
        }

        const isUserExist = await User.find({
            email
        })

        if(!isUserExist)
        {
            throw new ApiError(
                404,
                " User not found ",
            )
        }

        console.log("userId ", isUserExist[0]._id);
        const isPasswordCorrect = await passwordCompare(isUserExist[0]._id,password);
        if(!isPasswordCorrect)
        {
            throw new ApiError(
                401,
                "Incorrect Password"
            )
        }

        const { token } = await generateToken(isUserExist[0]._id);

        console.log("login token ", token);

        const cookieOptions = {
            httpOnly:true,
            secure:true,
            expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000) // 1 day Expiry 
        }
        
        res.cookie('token', token, cookieOptions);

        res.status(
            200
        ).json(
            new ApiResponse(
                200,
                " User LoggedIn Successfully ",
                isUserExist[0]
            )
        )

    }
)

const logoutUser = asyncHandler(
    async(req,res,next)=>{
        res.clearCookie('token',{
            httpOnly:true,
            secure:true 
        });

        res.status(
            200
        ).json(
            new ApiResponse(
                200,
                " User LoggedOut Successfully "
            )
        )
    }
)

const getAllUsers = asyncHandler(
    async(req,res,next) => {
        const users = await User.find({});
        if(
            !users
        ){
            throw new ApiError(
                404,
                " no users found "
            )
        }

        res.status(
            200
        ).json(
            new ApiResponse(
                200,
                " All Users ",
                users
            )
        )
    }
)

export {
    registerUser,
    loginUser,
    logoutUser,
    getAllUsers
}


 