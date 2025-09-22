import express from "express";
import mongoose from "mongoose";
import User from "../models/userSchema.mjs";
import { user as seedUsers } from "../data/data.mjs";

const router = express.Router();

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

//get
router.get("/users", async (_req, res) => {
  try {
    const docs = await User.find().lean();
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: "failed to fetch users", details: err.message });
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ error: "invalid id" });

    const doc = await User.findById(id).lean();
    if (!doc) return res.status(404).json({ error: "not found" });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: "failed to fetch user", details: err.message });
  }
});

//Post
router.post("/users", async (req, res) => {
  try {
    const created = await User.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    if (err?.code === 11000) {
      return res.status(409).json({ error: "email already exists" });
    }
    res.status(400).json({ error: "failed to create user", details: err.message });
  }
});

//patch
router.patch("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ error: "invalid id" });

    const updated = await User.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    if (!updated) return res.status(404).json({ error: "not found" });
    res.json(updated);
  } catch (err) {
    if (err?.code === 11000) {
      return res.status(409).json({ error: "email already exists" });
    }
    res.status(400).json({ error: "failed to update user", details: err.message });
  }
});
//delete
router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ error: "invalid id" });

    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "not found" });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "failed to delete user", details: err.message });
  }
});
//Post
router.post("/users/seed", async (_req, res) => {
  try {
    if (!Array.isArray(seedUsers) || seedUsers.length === 0) {
      return res.status(400).json({ error: "no seed data" });
    }
    const inserted = await User.insertMany(seedUsers, { ordered: false });
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

