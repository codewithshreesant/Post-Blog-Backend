
import express from 'express'

const app = express();

import cors from 'cors'
import cookieParser from 'cookie-parser';
import userRouter from './router/user.router.js'
import postRouter from './router/post.router.js'
import commentRouter from './router/comment.router.js'    
import contactRouter from './router/contact.router.js'   
// import cookieParser from 'cookie-parser'
import dotenv from 'dotenv' 
import { connectDB } from './db/index.js';
dotenv.config();
const PORT = process.env.PORT || 5000;  


app.use(express.json())

app.use(cors(
    {
        origin:'https://post-blog-backend.onrender.com',
        credentials:true
    }
))


app.use(
    cookieParser()
)

connectDB()

app.use(express.urlencoded({ extended:false }))

app.use('/api/user', userRouter);

app.use('/api/post', postRouter);

app.use('/api/comment', commentRouter);

app.use('/api/contact', contactRouter);

app.listen(PORT, ()=>{
    console.log(`The server is listening at PORT ${PORT}`);
})    




