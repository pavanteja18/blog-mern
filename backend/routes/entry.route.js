import express from "express";
import mongoose from "mongoose";
import Entry from "../models/entry.model.js";
import {
  getEntry,
  createEntry,
  updateEntry,
  deleteEntry,
} from "../controller/product.controller.js";

const router = express.Router();

router.get("/", getEntry);

router.post("/", createEntry);

router.put("/:id", updateEntry);

router.delete("/:id", deleteEntry);

export default router;
