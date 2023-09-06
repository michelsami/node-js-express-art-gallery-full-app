import express from 'express'
import { register } from '../controllers/auth-controller.js';


export const AuthenticationRouter = express.Router();



AuthenticationRouter.route('/register')
	.post(register)