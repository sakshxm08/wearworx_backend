const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Creating tokens
const createToken = (_id) =>
  jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });

// Signup user

// Logic - First, we signup the user using the static signup method initialized in the userModel.js file, which creates a collection of the user with email and password in the DB. Then with the controller functions, we spread the request body with email and password and pass it to the User.signup method (created in userModel). Then the user object (returned from the signup method) is converted to a token using JWT, and passed as the response to the frontend, so that we don't pass the password to the fronted.
// DB stores email and password
// Response has email and token of user object.

const signupUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.signup(name, email, password);

    // Create token
    const token = createToken(user._id);
    res.status(200).json({ name, email, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Login user
// Same logic as signup
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // Create token
    const token = createToken(user._id);
    res.status(200).json({ name: user.name, email, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { signupUser, loginUser };
