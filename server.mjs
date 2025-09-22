import express from "express";
import dotenv from "dotenv";
import log from "./middleware/loggingMiddleware.mjs";
import globalErr from "./middleware/globalerr.mjs";


//Setup
dotenv.config();
const app = express();
const PORT = process.env.Port || 3001;

//DB Connection
connectDB();

//Middleware
app.use(express.json());
app.use(log);


//Routes


//Error Handle Middlware
app.use(globalErr);


//Listener
app.listen(PORT, () => {
    console.log(`Server Running on Port: ${PORT}`);
});