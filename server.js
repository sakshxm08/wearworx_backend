require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

// Routes Imports
const cartRoutes = require("./routes/cart");
const stashRoutes = require("./routes/stash");
const storeRoutes = require("./routes/store");
const userRoutes = require("./routes/user");

// Express App
const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
// For the requests
app.use(express.json());
// To get the type of request
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/api/cart", cartRoutes);
app.use("/api/stash", stashRoutes);
app.use("/api/store", storeRoutes);
app.use("/api/user", userRoutes);

// Connect to DB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    // Listen for requests
    app.listen(PORT, () => {
      console.log("Connected to DB and listening on port", PORT);
    });
  })
  .catch((err) => console.log(err));
