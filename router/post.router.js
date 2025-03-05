
import express,{ Router } from 'express' 
import { createPost, deletePost, getPosts, getSinglePost, homeRecommended, recommendedPosts, UpdatePost } from '../controllers/post.controller.js';

const router = Router();

router.route('/create-post').post(createPost);
router.route('/posts').get(getPosts);
router.route('/posts/recommended/:id').get(recommendedPosts);
router.route('/posts/home').get(homeRecommended);
router.route('/update/:id').put(UpdatePost);
router.route('/posts/:id').get(getSinglePost);
router.route('/delete/:id').delete(deletePost);


export default router;