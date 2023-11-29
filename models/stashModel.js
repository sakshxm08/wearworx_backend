const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const stashSchema = new Schema(
  {
    stash: {
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

stashSchema.statics.add = async function (user_id, stash_items) {
  const exists = await this.findOne({ user_id });
  if (exists) throw Error("Stash already created");

  const stash = await this.create({ user_id, stash: stash_items });

  return stash;
};

module.exports = mongoose.connection.useDb("cart").model("stash", stashSchema);
