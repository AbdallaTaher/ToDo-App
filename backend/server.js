require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoute");
const todoRoutes = require("./routes/todoRoute");
const path = require("path");

app.use(express.json());
app.use(cors());
app.use("/api", authRoutes);
app.use("/api/todo", todoRoutes);

const PORT = process.env.PORT || 5000; // No extra spaces, no ";" at the end

mongoose
  .connect(process.env.DB_url)
  .then((result) => {
    console.log("DB connected successfully!");
  })
  .catch((err) => console.log("mongodb connection err", err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.use(express.static(path.join(__dirname, "client/dist")));

// Catch-all route for SPA (important!)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});
