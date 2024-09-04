//Requires
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const post = require("./src/resources/posts/model");

//Variables
const app = express();
const port = process.env.PORT || 6000;
const db_url = process.env.DB_URL;

//Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

//Routes
require("./src/resources/routes")(app);
app.all("*", (req, res, next) => {
  res.status(404).json({ Message: "Error not found" });
});
app.use((err, req, res, next) => {
  res.status(404).json({ error: err.message });
});

//Connecting to database & server
mongoose.connect(db_url).then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
