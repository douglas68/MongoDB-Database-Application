import mongoose from "mongoose";

const reflectionSchema = new mongoose.Schema ({
  userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true, index: true },
  weekStartISO: { type: String, required: true, match: /^\d{4}-\d{2}-\d{2}$/, index: true },
  text: { type: String, maxlength: 3000 }
}, { timestamps: true });

reflectionSchema.index({ userId: 1, weekStartISO: 1 }, { unique: true });

export default mongoose.model("Reflection", reflectionsSchema);