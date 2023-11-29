const express = require("express");
const {
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
} = require("../controllers/storeController");

const router = express.Router();

// Get all the items from the store
router.get("/products", getAllFromStore);

// Get a single item
router.get("/products/:category/:id", getItemFromStore);

// Get items of a category
router.get("/products/:category", getItemsOfCategory);

// Post item to store
router.post("/products", addToStore);

// Delete an item
router.delete("/products/:category/:id", deleteFromStore);

// Update an item
router.patch("/products/:category/:id", updateInStore);

// Get all the categories
router.get("/categories", getCategories);

// Add category
router.post("/categories", addCategory);

// Search Products
router.get("/search/product/:query", searchProducts);

// Search Categories
router.get("/search/category/:query", searchCategories);

module.exports = router;
