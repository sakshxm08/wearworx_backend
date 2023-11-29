const Stash = require("../models/stashModel");

// GET stash items
const getStash = async (req, res) => {
  try {
    const user_id = req.user._id;

    const items = await Stash.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// POST item to stash
const addToStash = async (req, res) => {
  const stash_items = req.body;
  const user_id = req.user._id;

  try {
    const stash = await Stash.add(user_id, stash_items);
    res.status(200).json(stash);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PATCH stash
const updateStash = async (req, res) => {
  const user_id = req.user._id;
  const update = { stash: req.body };
  const stash = await Stash.findOneAndUpdate({ user_id }, update, {
    new: true,
  });

  if (!stash) return res.status(404).json({ error: "No item found" });

  res.status(200).json(stash);
};
module.exports = { getStash, addToStash, updateStash };
