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

const updateAdmin = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { password, ...updateData } = req.body; // Extract password and other data

    try {
        const admin = await Admin.findById(id);

        if (!admin) {
            throw new ApiError(404, "Admin not found");
        }

        // Update all fields except password directly
        Object.assign(admin, updateData);

        // Update password only if provided
        if (password) {
            admin.password = password; // Set the new password, triggering pre('save')
        }

        const updatedAdmin = await admin.save(); // Save the document, triggering pre('save')

        res.status(200).json(new ApiResponse(200, "Admin updated successfully", updatedAdmin));

    } catch (error) {
        return next(error);
    }
});

const AdminLogin = asyncHandler(
    async(req,res,next) => {
        const { username, password } = req.body;
        if(
            [username, password].some((field)=>{
                return field===''
            })
        ){
            // throw new ApiError(
            //     402,
            //     "username and password is required "
            // )
            return res.status(
                402
            ).json(
                new ApiError(
                    402,
                    "username and password is required"
                )
            )
        }

        const isAdminExist = await Admin.find({username});

        if(isAdminExist.length === 0)
        {
            throw new ApiError(
                404,
                "No Admin Found"
            )
        }
        console.log("is admin exist ", isAdminExist)
        const isPasswordCorrect = await passwordCompare(isAdminExist[0]._id, password);

        if(
            !isPasswordCorrect 
        ){
            // throw new ApiError(
            //     404,
            //     " Incorrect Password " 
            // )
            return res.status(
                404
            ).json(
                new ApiError(
                    404,
                    "Incorrect password"
                )
            )
        }

        res.status(
            200
        ).json(
            new ApiResponse(
                200,
                " Admin Login Successfull ",
                isAdminExist
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

