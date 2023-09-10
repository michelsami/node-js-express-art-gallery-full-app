import express from "express";
import dotenv from "dotenv";
import { AuthenticationRouter } from "./routes/auth-route.js";
import { connectionDB } from "./config/DBConnection.js";
import { router as productRouter } from "./routes/product-route.js";
import { router as orderRouter } from "./routes/order-route.js";
import mongoose from "mongoose";

dotenv.config();

// database connection
connectionDB();

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());

app.use("/auth", AuthenticationRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);

// mongoose
//   .connect(process.env.DB_URI, {})
//   .then(() => {
//     console.log("Connected to Mongodb");
//   })
//   .catch((error) => {
//     console.log(error);
//   });

app.listen(port, (error) => {
  if (!error) {
    console.log(
      `Server is Successfully Running and App is listening on port ${port}...`
    );
  } else {
    console.log(`Error occurred, server can't start with error: ${error}`);
  }
});
