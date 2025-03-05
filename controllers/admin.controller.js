import { Admin } from "../models/admin.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const passwordCompare = async (adminId, password)=> {
    const admin = await Admin.findById({_id:adminId});
    const isCorrectPassword = await admin.comparePassword(password);
    console.log("is password correct ", isCorrectPassword);

    return isCorrectPassword;
}

const createAdmin = asyncHandler(
    async(req,res,next)=>{
        const { username, password } = req.body;
        if(
            [username, password].some((field)=>{
                return field===''
            })
        ){
            throw new ApiError(
                402,
                "username and password is required"
            )
        }

        const isAdminExist = await Admin.find({username});

        if(isAdminExist.length > 0)
        {
            throw new ApiError(
                402,
                "Admin already Exist"
            )
        }

        const newAdmin = await Admin.create(
            {
                username,
                password 
            }
        )

        const admin = await newAdmin.save();

        res.status(
            200
        ).json(
            new ApiResponse(
                200,
                " New Admin Created Successfully  ",
                admin 
            )
        )
    }
)

const getAdmin = asyncHandler(
    async (req,res,next) => {
        const admin = await Admin.find({});
        if(
            !admin
        ){
            throw new ApiError(
                404,
                "NO Admin Found"
            )
        }

        res.status(
            200
        ).json(
            new ApiRespose(
                200,
                " Admin ",
                admin
            )
        )
    }
)

const updateAdmin = asyncHandler(
    async (req,res,next) => {
        const { id } = req.params;
        const updatedAdmin = await Admin.findByIdAndUpdate(
            {_id:id},
            {
                ...req.body
            },
            {
                new: true
            }
        )

        if(
            !updatedAdmin
        ){
            throw new ApiError(
                404,
                " NO Updated Admin Found"
            )
        }

        res.status(
            200
        ).json(
            new ApiResponse(
                200,
                " Admin Updated Successfully "
            )
        )
    }
)

const AdminLogin = asyncHandler(
    async(req,res,next) => {
        const { username, password } = req.body;
        if(
            [username, password].some((field)=>{
                return field===''
            })
        ){
            throw new ApiError(
                402,
                "username and password is required "
            )
        }

        const isAdminExist = await Admin.find({username});

        if(!isAdminExist)
        {
            throw new ApiError(
                404,
                "No Admin Found"
            )
        }

        const isPasswordCorrect = await passwordCompare(isAdminExist[0]._id, password);

        if(
            !isPasswordCorrect 
        ){
            throw new ApiError(
                404,
                " Incorrect Password " 
            )
        }

        res.status(
            200
        ).json(
            new ApiResponse(
                200,
                " Admin Login Successfull ",
            )
        )

    }
)

export {
    createAdmin,
    getAdmin,
    AdminLogin,
    updateAdmin 
}

