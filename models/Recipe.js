const mongoose = require("mongoose");
const { Schema } = mongoose;

const recipeSchema = new Schema({
  name: String,
  ingredients: [String],
  directions: [String],
  servings: Number
});

mongoose.model("recipes", recipeSchema);
