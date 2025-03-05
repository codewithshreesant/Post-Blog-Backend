import { Comment } from "../models/comments.model.js";
import { Post } from "../models/posts.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createPost = asyncHandler(
    async (req,res,next) => {
        const { title, description, image, author, recommended } = req.body;
        if(
            [ title, description, image, author ].some((field)=>{
                return field==""
            })
        ){
            throw new ApiError(
                402,
                " All fields are required ! "
            )
        }

        const newPost = await Post.create(
            {
                title,
                description,
                image,
                author,
                recommended: recommended ? recommended : false 
            }
        )

        const post = await newPost.save();

        res.status(
            200
        ).json(
            new ApiResponse(
                200,
                " Post created Successfully ",
                post 
            )
        )

    }
)

const getPosts = asyncHandler(
    async(req,res,next) => {
        const posts = await Post.find({});
        if(!posts){
            throw new ApiError(
                402,
                " Posts not found ! "
            )
        }

        res.status(
            200
        ).json(
            new ApiResponse(
                200,
                " All Posts ",
                posts
            )
        )

    }
)

const getSinglePost = asyncHandler(
    async(req,res,next) => {
        const { id } = req.params;

        if(!id)
        {
            throw new ApiError(
                402,
                " id is required ! "
            )
        }
        
        const singlePost = await Post.findById(id);

        if(
            !singlePost 
        ){
            throw new ApiError(
                404,
                " singlePost not found ! "          
            )
        }
        
        const comments = await Comment.find({postId:id});

        res.status(
            200
        ).json(
            new ApiResponse(
                200,
                " posts and comments ",
                {
                    singlePost,
                    comments    
                }
            )
        )

    }
)

const recommendedPosts = asyncHandler(
    async(req,res,next) => {
        const { id } = req.params;

        if(
            !id 
        )
        {
            throw new ApiError(
                401,
                " id is required "
            )
        }

        const post = await Post.findById({_id:id});

        // console.log(" title ", post.title);
        // console.log(" description ", post.description);

       const { title, description } = post;

       const recommendTitle = new RegExp(title.split('').join('|')); 
       const recommendDescription = new RegExp(description.split('').join('|'));

       const recommendedQuery = {
        $or: [
          { title: { $regex: recommendTitle } },
          { description: { $regex: recommendDescription } },
        ],
        _id: { $ne: id }, // Exclude the current post
      };
    
      const recommendedPost = await Post.find(recommendedQuery);

       res.status(
        200
       ).json(
        new ApiResponse(
            200,
            " Recommended Posts ",
            recommendedPost 
        )
       )
    }
)

const UpdatePost = asyncHandler(
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

        const updatedPost = await Post.findByIdAndUpdate(
            { _id : id },

            {
                ...req.body
            },
            {
                new:true
            }
        )

        if (
            !updatedPost 
        ){
            throw new ApiError(
                401,
                " No updated Post found " 
            )
        }

        res.status(
            200
        ).json(
            new ApiResponse(
                200,
                " Post Updated Successfully ",
                updatedPost
            )
        )

    }
)

const deletePost = asyncHandler(
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

        const deletedPost = await Post.findByIdAndDelete(
            { _id: id }
        )

        if(
            !deletedPost 
        ){
            throw new ApiError(
                402,
                "no updated post found "
            )
        }

        res.status(
            200
        ).json(
            new ApiResponse(
                200,
                " Post deleted successfully ",
                deletedPost
            )
        )


    }
)

const homeRecommended = asyncHandler(
    async(req,res,next) => {
        const recommendedPosts = await Post.find({
            recommended:true
        })  

        if(
            !recommendedPosts
        ){
            throw new ApiError(
                402,
                " No recommended posts found "
            )
        }

        res.status(
            200
        ).json(
            new ApiResponse(
                200,
                " Home Recommended Posts ",
                recommendedPosts
            )
        )
    }
)



export {
    createPost,
    getPosts ,
    getSinglePost,
    recommendedPosts,
    UpdatePost,
    deletePost,
    homeRecommended
}

