
import mongoose,{ connect } from "mongoose"

export const connectDB = async() => {
    try{
        const connection = await connect(process.env.MONGODB_URI); 
        console.log(` DATABASE CONNECTED ! HOST ! ${connection.connection.host}`);
    }catch(error){
        console.log(" Error occured while connecting with database ", error.message );
    }

}

