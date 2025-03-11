import { Contact } from "../models/contact.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createContact = asyncHandler(
    async(req,res,next) => {
        const { fullname, email, message } = req.body;
        if(
            [fullname, email].some((field)=>{
                return field === ""
            })
        ){
            res.status(
                402
            ).json(
                new ApiResponse(
                    402,
                    "fullname and email are required!"
                )
            )
        }

        const isUserExist = await Contact.find({email});

        if(
            isUserExist.length > 0
        ){
            res.status(
                402
            ).json(
                new ApiResponse(
                    402,
                    "email already used"
                )
            )
        }

        const newContact = await new Contact({
            fullname,email,message
        })


        const contact = await newContact.save();

        res.status(
            200
        ).json(
            new ApiResponse(
                200,
                " Contact created successfully "
            )
        )

    }
)

const getSingleContact = asyncHandler(
    async(req,res,next) => {
        const { id } = req.params;
        if(
            !id
        ){
            res.status(
                402
            ).json(
                new ApiResponse(
                    402,
                    "id is required"
                )
            )
        }

        const singleContact = await Contact.findById({_id:id});

        if(
            !singleContact
        ){
            res.status(
                404
            ).json(
                new ApiResponse(
                    404,
                    " no single contact found " 
                )
            )
        }

        res.status(
            200
        ).json(
            new ApiResponse(
                200,
                " Single contact is ",
                singleContact 
            )
        )

    }
)

const getAllContacts = asyncHandler(
    async(req,res,next) => {
        const contacts = await Contact.find({});
        
        res.status(
            200
        ).json(
            new ApiResponse(
                200,
                "Contacts",
                contacts
            )
        )

    }
)

const updateContact = asyncHandler(
    async(req,res,next) => {
        const { id } = req.params;
        if(
            !id
        ){
            res.status(
                402
            ).json(
                new ApiResponse(
                    402,
                    "id is required "
                )
            )
        }

        const updatedPost = await Contact.findByIdAndUpdate(
            {_id:id},
            {
                ...req.body
            },
            {
                new:true
            }
        )

        if(
            !updatedPost
        ){
            res.status(
                404
            ).json(
                new ApiResponse(
                    404,
                    " no updated post found  "
                )
            )
        }

        res.status(
            200
        ).json(
            new ApiResponse(
                200,
                " post updated successfully ",

                updatedPost
            )
        )

    }
)


const deleteContact = asyncHandler(
    async(req,res,next) => {
        const { id } = req.params;
        if(
            !id
        ){
            res.status(
                402
            ).json(
                new ApiResponse(
                    402,
                    " id is required "
                )
            )
        }

        const deletedPost = await Contact.findByIdAndDelete(id);

        if(
            !deletedPost
        ){
            res.status(
                404
            ).json(
                new ApiResponse(
                    404,
                    " no deleted post found "
                )
            )
        }

        res.status(
            200
        ).json(
            new ApiResponse(
                200,
                " post deleted successfully ",
                deletedPost 
            )
        )

    }
)

export { 
    createContact,
    getAllContacts,
    updateContact,
    deleteContact,
    getSingleContact 
}

