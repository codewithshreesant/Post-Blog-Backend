
import express,{Router} from 'express'
import { createComment, deletedComment, getComments, getSingleComment, updatedComment } from '../controllers/comment.controller.js';

const router = Router();

router.route('/create-comment').post(createComment);
router.route('/comments').get(getComments);
router.route('/comments/:id').get(getSingleComment);
router.route('/update/:id').put(updatedComment);
router.route('/delete/:id').delete(deletedComment);

export default router;