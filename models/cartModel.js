const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    cart: {
      type: Array,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

cartSchema.statics.add = async function (user_id, cart_items) {
  const exists = await this.findOne({ user_id });
  if (exists) throw Error("Cart already created");

  const cart = await this.create({ user_id, cart: cart_items });

  return cart;
};

module.exports = mongoose.connection.useDb("cart").model("cart", cartSchema);
