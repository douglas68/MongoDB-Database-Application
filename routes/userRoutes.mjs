import express from "express";
import mongoose from "mongoose";
import User from "../models/userSchema.mjs";
import{ user } from "../data/data.mjs";

const router = express.Router();

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

//get a list of users
//router



export default router; 

