import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectionStr = process.env.mongoURI || "";

async function connectionDB(){

    try{

        await mongoose.connect(connectionStr);

        console.log(`MongoDB Connected......`)

    }catch (err){

        console.error(err.message);
    }
}

export default connectionDB;