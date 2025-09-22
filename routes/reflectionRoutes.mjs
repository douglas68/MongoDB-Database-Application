import express from "express";
import mongoose from "mongoose";
import Reflection from "../models/reflectionSchema.mjs";
import{ reflections as seedReflections } from "../data/data.mjs";

const router = express.Router();
const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);
//get a list
router.get("/reflections", async (_req, res) => {
  try {
    const docs = await Reflection.find().lean();
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: "failed to fetch reflections", details: err.message });
  }
});
//get a reflection
router.get("/reflections/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ error: "invalid id" });

    const doc = await Reflection.findById(id).lean();
    if (!doc) return res.status(404).json({ error: "not found" });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: "failed to fetch reflection", details: err.message });
  }
});


//Post
router.post("/reflections", async (req, res) => {
  try {
    const created = await Reflection.create(req.body); 
    res.status(201).json(created);
  } catch (err) {
    if (err?.code === 11000) {
      return res.status(409).json({ error: "reflection already exists for this user/week" });
    }
    res.status(400).json({ error: "failed to create reflection", details: err.message });
  }
});

//patch
router.patch("/reflections/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ error: "invalid id" });

    const updated = await Reflection.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    if (!updated) return res.status(404).json({ error: "not found" });
    res.json(updated);
  } catch (err) {
    if (err?.code === 11000) {
      return res.status(409).json({ error: "duplicate reflection for this user/week" });
    }
    res.status(400).json({ error: "failed to update reflection", details: err.message });
  }
});


//delete
router.delete("/reflections/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ error: "invalid id" });

    const deleted = await Reflection.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "not found" });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "failed to delete reflection", details: err.message });
  }
});


//Post
router.post("/reflections/seed", async (_req, res) => {

  try {

    if (!Array.isArray(seedReflections) || seedReflections.length === 0) {
      return res.status(400).json({ error: "no seed data" });
    }

    const inserted = await Reflection.insertMany(seedReflections, { ordered: false });
    res.status(201).json({ inserted: inserted.length });
  } catch (err) {
    if (err?.writeErrors) {
      const inserted = err.result?.result?.nInserted ?? 0;
      const dupes = err.writeErrors.filter(e => e.code === 11000).length;
      return res.status(201).json({ inserted, duplicatesSkipped: dupes });
    }
    res.status(400).json({ error: "failed to seed", details: err.message });
  }
});



export default router; 

