const express = require("express");
const {
  addToStash,
  getStash,
  updateStash,
} = require("../controllers/stashController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// Require auth for cart
router.use(requireAuth);

// Get all items in cart
router.get("/", getStash);

// Post a new item
router.post("/", addToStash);

// Update an item
router.patch("/", updateStash);

module.exports = router;
