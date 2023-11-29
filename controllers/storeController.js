const store = require("../models/store/productSchema");
const categories = require("../models/store/categorySchema");
const mongoose = require("mongoose");

// GET items from store
const getAllFromStore = async (req, res) => {
  try {
    const items = await store.find({}).sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET a unique item from store
const getItemFromStore = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid item id" });
  }

  const item = await store.findById(id);

  if (!item) return res.status(404).json({ error: "No such item" });

  res.status(200).json(item);
};

// GET items of a category
const getItemsOfCategory = async (req, res) => {
  const { category } = req.params;

  const items = await store.find({
    $or: [{ category: category }, { keywords: category }],
  });

  if (!items)
    return res.status(404).json({ error: "No items in this category" });

  res.status(200).json(items);
};

// POST an item to the store
const addToStore = async (req, res) => {
  try {
    const storeItem = await store.create(req.body);
    res.status(200).json(storeItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Remove an item from store
const deleteFromStore = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "No item found" });

  const item = await store.findOneAndDelete({ _id: id });

  if (!item) return res.status(404).json({ error: "No item found" });

  res.status(200).json(item);
};

// Update item in store
const updateInStore = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "No item found" });

  const item = await store.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!item) return res.status(404).json({ error: "No item found" });

  res.status(200).json(item);
};

const getCategories = async (req, res) => {
  try {
    const items = await categories.find({});
    res.status(200).json(items);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// POST category
const addCategory = async (req, res) => {
  try {
    const category = await categories.create(req.body);
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// SEARCH items
const searchProducts = async (req, res) => {
  try {
    const query = req.params.query;
    const items = await store.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { keywords: { $regex: query, $options: "i" } },
      ],
    });

    res.status(200).json(items);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// SEARCH categories
const searchCategories = async (req, res) => {
  try {
    const query = req.params.query;
    const items = await categories.find({
      name: { $regex: query, $options: "i" },
    });

    res.status(200).json(items);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  addToStore,
  getAllFromStore,
  getItemFromStore,
  getItemsOfCategory,
  deleteFromStore,
  updateInStore,
  getCategories,
  addCategory,
  searchProducts,
  searchCategories,
};
