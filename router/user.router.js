
import express,{ Router } from 'express' 
import { getAllUsers, loginUser, logoutUser, registerUser } from '../controllers/user.controller.js'; 
import { jwtVerify } from '../middlewares/verifyJwt.middleware.js';
import { AdminLogin, createAdmin, updateAdmin } from '../controllers/admin.controller.js';

const router = Router();

router.route('/register').post(registerUser);

router.route('/login').post(loginUser); 

router.route('/logout').post(jwtVerify,logoutUser);

router.route('/users').get(getAllUsers);

router.route('/create-admin').post(createAdmin);

router.route('/admin').post(jwtVerify, AdminLogin);
// router.route('/user/:id').put(update);

router.route('/update/:id').put(jwtVerify, updateAdmin);

export default router;