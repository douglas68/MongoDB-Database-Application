import express from "express"
import dotenv from "dotenv"


//Setup
dotenv.config();
const app = express();
const PORT = process.env.Port || 3001;

//DB Connection
connectDB();

//Middleware
app.use(express.json());
