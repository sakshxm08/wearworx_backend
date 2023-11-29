const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Static Signup Method

// Normal function is used so that 'this' keyword can be used
// 'this' keyword cannot be used with arrow functions
userSchema.statics.signup = async function (name, email, password) {
  //   Validation
  if (!email || !password || !name) throw Error("All fields are mandatory");

  const exists = await this.findOne({ email });
  if (exists) throw Error("Email already in use");

  if (!validator.isEmail(email)) throw Error("Invalid Email");
  if (!validator.isStrongPassword(password))
    throw Error("Password is not strong enough");

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ name, email, password: hash });

  return user;
};

// Static Login Method

userSchema.statics.login = async function (email, password) {
  if (!email || !password) throw Error("All fields must be filled");

  const user = await this.findOne({ email });
  if (!user) throw Error("Invalid email");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw Error("Incorrect password");

  return user;
};

module.exports = mongoose.connection.useDb("users").model("user", userSchema);
