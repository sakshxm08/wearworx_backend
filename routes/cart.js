const express = require("express");
const {
  addToCart,
  getCart,
  updateCart,
} = require("../controllers/cartController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// Require auth for cart
router.use(requireAuth);

// Get all items in cart
router.get("/", getCart);

// Post a new item
router.post("/", addToCart);

// Update an item
router.patch("/", updateCart);

module.exports = router;
