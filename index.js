import express from 'express';
import dotenv from 'dotenv';


dotenv.config();
const port = process.env.PORT || 5000;
const app = express();



app.use(express.json());





app.listen(port, (error)=>{
	if(!error) {
		console.log(`Server is Successfully Running and App is listening on port ${port}...`);
	}else{
		console.log(`Error occurred, server can't start with error: ${error}`);
	}
});