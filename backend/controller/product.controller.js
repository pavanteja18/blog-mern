import Entry from "../models/entry.model.js";
import mongoose from "mongoose";

export const getEntry = async (req, res) => {
  try {
    const data = await Entry.find({});
    res
      .status(201)
      .json({ message: "Data Retrieved Successfully", entries: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createEntry = async (req, res) => {
  const { title, description, tags } = req.body;

  if (!title || !description) {
    return res
      .status(400)
      .json({ message: "Please fill the required inputs." });
  }

  try {
    const newEntry = new Entry({
      title,
      description,
      tags,
    });

    await newEntry.save();
    res
      .status(201)
      .json({ message: "Entry created successfully", entry: newEntry });
  } catch (error) {
    console.error("Error creating entry:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateEntry = async (req, res) => {
  const { id } = req.params;
  const updateEntry = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: "False", message: "Record not Found!!" });
  }
  try {
    const updatedEntry = await Entry.findByIdAndUpdate(id, updateEntry, {
      new: true,
    });
    res.status(202).json({
      success: "True",
      message: `Successfully Update the id - ${id}`,
      data: updatedEntry,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      success: "False",
      message: "Internal Server Error - Not Implemented.",
    });
  }
};

export const deleteEntry = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: "False", message: "Record not Found!!" });
  }

  try {
    await Entry.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: "True", message: "Deletion of record successful" });
  } catch (error) {
    res
      .status(500)
      .json({ success: "False", message: "Internal Server Error" });
  }
};
