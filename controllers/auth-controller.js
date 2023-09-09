import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
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

export const checkIfAdmin = async (req, res, next) => {

	const {userEmail} = req.body;
	const userRoleCheck = await userModel.findOne({ email: userEmail });

	if(userRoleCheck.role !== "admin"){
		return res.status(403).send({message: "You are not allowed to access this page."});
	}

	next();
}


export const authenticateUserWithEmailAndPassword = async (req, res, next) => {
	
	const { email, password } = req.body;

	const user = await userModel.findOne({ email });
	if (!user) throw new Error('Invalid email or password');

	const isMatch = await userModel.comparePassword(password);
	if (!isMatch) throw new Error('Invalid email or password');
	 
     next();
  };

export const authenticateUserWithToken = async (req, res, next) => {
	let token = req.headers.authorization;
  
	if (!token) {
	  return res.status(401).json({ error: 'Authentication failed. Token not provided.' });
	}
  
	 token = token.replace('Bearer ', '');

	 jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {

			jwt.verify(token, process.env.JWT_SECRET_REFRESH, (err, decoded) => {
				if (err) {
				  return res.status(401).json({ error: 'Authentication failed. Invalid token.' });
				}
		  
				req.body.userEmail = decoded.email; 
				next();
			  });
			  return;

		}

		req.body.userEmail = decoded.email; 
		next();
	  });

	 
     
  };

export const register = async(req, res)=>{

	
try {
	const {name, email, password, phoneNumber, address } = req.body;

	const tokens = generateAcessAndRefreshTokens({ email, name });
	const newUser = {name: name, password: password, email: email, refreshToken: tokens.refreshToken, accessToken:tokens.accessToken, phoneNumber:phoneNumber, address:address}

	const createNewUser = await userModel.create(newUser);
	const {password:userPassword, role,__v, ...user} = createNewUser.toObject();
	
	res.status(201).json({NewUserCreated : user})
} catch (error) {
	res.status(500).json({error : error})}
	

}

export const login = async(req, res) => {
	try {
	
		const { email, password } = req.body;

		
	
		const userExsist = await userModel.findOne({ email });
	
		if (!userExsist) {
		  res.status(401).json({ error: 'Invalid email or password' });
		  return;
		}
	
		
		const isPasswordValid = await bcrypt.compare(password, userExsist.password);
		//console.log(isPasswordValid);

		if (!isPasswordValid) {
		  res.status(401).json({ error: 'Invalid email or password' });
		  return;
		}
		

			const {password:userPassword, role,__v, ...user} = userExsist.toObject();

			

		
		 return res.json({ message: 'Login successful' , 
		  userDetails:
		  //{id : userExsist._id, email : userExsist.email, name : userExsist.name}
		  user
		 
		});	

	} catch (error) {
		res.status(401).json({ error: error });
	}
}

export const updateAccount = async (req, res) => {

	// authenticate the user with authenticateUserWithToken and pass his email address to the body
	try {

		const {userEmail } = req.body
		const user = {}

		const profileFields = ["name", "email", "phoneNumber", "Address"]
		
		Object.entries(req.body).forEach(([key, value]) => {
			if (value !== undefined 
				&& profileFields.includes(key)
				) {
				user[key] = value;
				
			}
			
		  });
		
		const updatedUser = await userModel.findOneAndUpdate({email:userEmail}, user, {new: true});
	
		if (updatedUser == null) {
		 return	res.json({
				message: 'No account found with this email'
			  });
		}
		return	res.json({
			message: 'User profile updated successfully',
			user: updatedUser,
		  });
	} catch (error) {
		console.log(error)
		res.status(500).json({ status: 'Internal server error in updating', error: error });
	}
};

export const deleteAccount = async(req, res) => {

	const {userEmail } = req.body

	try {
		await userModel.findOneAndDelete({email: userEmail})
		res.status(200).json({ message: 'Document deleted successfully' });

	} catch (error) {
		res.status(500).json({ message: 'An error occurred while deleting the document', error: error });
	}
	
}

export const getAllUsers = async(req, res) => {
	try {
		const allUsers = await userModel.find();
		return res.status(200).json({AllUsers: allUsers});
	} catch (error) {
		res.status(500).json({error: error});
	}
};


