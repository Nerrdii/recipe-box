const express = require('express');
const router = express.Router();

const Recipe = require('../models/Recipe');

router.get('/', async (req, res) => {
  const recipes = await Recipe.find({});

  res.send(recipes);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const recipe = await Recipe.findById(id);

  res.send(recipe);
});

router.post('/', async (req, res) => {
  const { name, ingredients, directions, servings, description } = req.body;

  const newRecipe = new Recipe({
    name,
    description,
    ingredients,
    directions,
    servings
  });

  const recipe = await newRecipe.save();

  res.send(recipe);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;

  const recipe = await Recipe.findByIdAndUpdate(id, req.body, { new: true });

  res.send(recipe);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  await Recipe.findByIdAndRemove(id);

  res.status(200).send();
});

module.exports = router;
