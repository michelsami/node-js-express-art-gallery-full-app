import express from 'express';
import dotenv from 'dotenv';
import { AuthenticationRouter } from './routes/auth-route.js';
import { connectionDB } from './config/DBConnection.js';


dotenv.config();
const port = process.env.PORT || 5000;
const app = express();

// database connection 
connectionDB()

app.use(express.json());


app.use('/auth', AuthenticationRouter)




app.listen(port, (error)=>{
	if(!error) {
		console.log(`Server is Successfully Running and App is listening on port ${port}...`);
	}else{
		console.log(`Error occurred, server can't start with error: ${error}`);
	}
});