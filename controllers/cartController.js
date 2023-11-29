const Cart = require("../models/cartModel");

// GET cart items
const getCart = async (req, res) => {
  try {
    const user_id = req.user._id;

    const items = await Cart.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// POST item to cart
const addToCart = async (req, res) => {
  const cart_items = req.body;
  const user_id = req.user._id;

  try {
    const cart = await Cart.add(user_id, cart_items);
    res.status(200).json(cart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PATCH cart
const updateCart = async (req, res) => {
  const user_id = req.user._id;
  const update = { cart: req.body };
  const cart = await Cart.findOneAndUpdate({ user_id }, update, { new: true });

  if (!cart) return res.status(404).json({ error: "No item found" });

  res.status(200).json(cart);
};
module.exports = { getCart, addToCart, updateCart };
