import { Comment } from "../models/comments.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createComment = asyncHandler(
    async (req,res,next) => {
        const { text, authorId, postId }= req.body;

        if(
            [text, authorId, postId].some((field)=>{
                return field===""
            })
        ){
            throw new ApiError(
                404,
                "all field are required"
            )
        }

        const comments = await Comment.create({
            text,
            authorId,
            postId 
        })

        const comment = await comments.save();

        if(
            !comments
        ){
            throw new ApiError(
                404,
                " no comments found "
            )
        }

        res.status(
            200
        ).json(
            new ApiResponse(
                200,
                " Comment created successfully ",
                comment 
            )
        )

    }
)

const getComments = asyncHandler(
    async(req,res,next)=>{
        const comments = await Comment.find({});
        if(
            !comments
        ){
            throw new ApiError(
                404,
                "no comments find"
            )
        }

        res.status(
            200
        ).json(
            new ApiResponse(
                200,
                "comments ",
                comments
            )
        )

    }
)

const getSingleComment = asyncHandler(
    async(req,res,next) => {
        const { id } = req.params;
        if(
            !id
        ){
            throw new ApiError(
                402,
                " id is required "
            )
        }

        const singleComment = await Comment.findById({_id:id});

        if(
            !singleComment
        ){
            throw new ApiError(
                404,
                "no single comment"
            )
        }

        res.status(
            200
        ).json(
            new ApiResponse(
                200,
                " Single Comment ",
                singleComment 
            )
        )

    }
)

const updatedComment = asyncHandler(
    async(req,res,next) => {
        const { id } = req.params;
        if(
            !id
        ){
            throw new ApiError(
                402,
                "id is required" 
            )
        }

        const updateComment = await Comment.findByIdAndUpdate(
            {_id:id},
            {
                ...req.body,
            },
            {
                new:true
            }
        )

        if(
            !updateComment
        ){
            throw new ApiError(
                404,
                "no updated Comment found"
            )
        }

        res.status(
            200
        ).json(
            new ApiResponse(
                200,
                "updated coment",
                updateComment
            )
        )
    }
)

const deletedComment = asyncHandler(
    async(req,res,next)=>{
        const { id }=req.params;
        if(
            !id
        ){
            throw new ApiError(
                402,
                "id is required"
            )
        }

        const deleteComment = await Comment.findByIdAndDelete(
            {_id:id}
        )

        if(
            !deleteComment
        ){
            throw new ApiError(
                404,
                "no deleted Comment found "
            )
        }

        res.status(
            200
        ).json(
            new ApiResponse(
                200,
                "Comment deleted successfully",
                deleteComment 
            )
        )
    }
)

export{
    createComment,
    getComments,
    updatedComment,
    deletedComment,
    getSingleComment 
}

