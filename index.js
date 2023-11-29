require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
// Routes Imports
const cartRoutes = require("./routes/cart");
const stashRoutes = require("./routes/stash");
const storeRoutes = require("./routes/store");
const userRoutes = require("./routes/user");

// Express App
const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
// For the requests
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  const corsWhitelist = [
    "https://wearworx.sakshxm08.in",
    "https://wearworx.netlify.app",
    "http://localhost:3000",
  ];

  if (corsWhitelist.includes(req.headers.origin)) {
    res.setHeader("Access-Control-Allow-Origin", req.headers.origin);

    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
  }

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
    app.listen(PORT);
  })
  .catch((err) => console.log(err));
