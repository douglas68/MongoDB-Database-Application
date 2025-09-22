import express from "express";
import dotenv from "dotenv";
import log from "./middleware/loggingMiddleware.mjs";
import globalErr from "./middleware/globalerr.mjs";
import connectionDB from "./db/conn.mjs";
import checkinRoutes from "./routes/checkinRoutes.mjs";
import goalRoutes from "./routes/goalRoutes.mjs";
import reflectionRoutes from "./routes/reflectionRoutes.mjs";
import userRoutes from "./routes/userRoutes.mjs";


//Setup
dotenv.config();
const app = express();
const PORT = process.env.Port || 3001;

//DB Connection
connectionDB ();

//Middleware
app.use(express.json());
app.use(log);


//Routes
app.use("/api/users", userRoutes);
app.use("/api/checkinRoutes", checkinRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/reflections", reflectionRoutes);

//Error Handle Middlware
app.use(globalErr);


//Listener
app.listen(PORT, () => {
    console.log(`Server Running on Port: ${PORT}`);
});