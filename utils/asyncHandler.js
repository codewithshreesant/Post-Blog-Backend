
export const asyncHandler = (fn)=>{
    return async(req,res,next) => {
        try
        {
            fn(req,res,next);
        } catch (error) {   
           console.log("Error occured ", error);  
        }
    }
}


