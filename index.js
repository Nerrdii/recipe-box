const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const keys = require("./config/keys");

require("./models/Recipe");

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());

app.use("/api/recipes", require("./routes/recipeRoutes"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => `App now listening on port ${PORT}...`);
