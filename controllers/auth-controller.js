import jwt from 'jsonwebtoken';
import { userModel } from '../models/user-model.js';


const generateAcessAndRefreshTokens = (pyload)=>{
	const accessToken = jwt.sign(pyload, process.env.JWT_SECRET , { expiresIn: '60m' });
	const refreshToken = jwt.sign(pyload, process.env.JWT_SECRET_REFRESH , { expiresIn: '7d' });

	const tokens = {
		accessToken :accessToken,
		refreshToken:refreshToken
	}
	return tokens;
}

export const register = async(req, res)=>{

	const {name, email, password, phone, address } = req.body;

	const tokens = generateAcessAndRefreshTokens({ email, name });

	
	const newUser = {name: name, password: password, email: email, refreshToken: tokens.refreshToken, accessToken:tokens.accessToken, phone:phone, address:address}

try {
	const createNewUser = await userModel.create(newUser);
	//const {password, role,slug,__v, ...user} = createNewUser.toObject();
	
	res.status(201).json({NewUserCreated : createNewUser})
} catch (error) {
	console.log(error)
}
	

}