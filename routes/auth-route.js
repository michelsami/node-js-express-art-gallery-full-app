import express from 'express'
import { authenticateUserWithToken, checkIfAdmin, deleteAccount, getAllUsers, login, register, updateAccount } from '../controllers/auth-controller.js';
import { createUserValidation, updateUserValidation } from '../utils/validator/user-validation.js';


export const AuthenticationRouter = express.Router();


AuthenticationRouter.route('/register')
	.post(createUserValidation, register)

AuthenticationRouter.route('/login')
	.post(login)


AuthenticationRouter.route('/update-account')
	.patch( updateUserValidation, updateAccount)



AuthenticationRouter.route('/delete-account')
	.delete( deleteAccount)



// for admins

AuthenticationRouter.route('/all-users')
	.post(authenticateUserWithToken, checkIfAdmin,getAllUsers)
