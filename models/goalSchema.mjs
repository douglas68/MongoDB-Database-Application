import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, trim: true, maxlength: 100 },
    targetPerWeek: { type: Number, min: 0, max: 7, default: 3 },
    active: { type: Boolean, default: true }
}, {timestamps: true});
    

export default mongoose.model("Goal", goalSchema);