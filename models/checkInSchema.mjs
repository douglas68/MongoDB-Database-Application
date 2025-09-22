import mongoose from "mongoose";

const checkInSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true, index: true },
  date:   { type: String, required: true, match: /^\d{4}-\d{2}-\d{2}$/, index: true },
  mood:   { type: Number, min: 1, max: 5, default: 3 },
  notes:  { type: String, maxlength: 500, trim: true }
}, { timestamps: true });

checkInSchema.index({ userId: 1, date: 1 }, { unique: true });

export default mongoose.model("CheckIn", checkInSchema);
