const express = require('express');
const router = express.Router();
const passport = require('passport');

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

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { name, ingredients, directions, servings, description } = req.body;

    const newRecipe = new Recipe({
      name,
      description,
      ingredients,
      directions,
      servings,
      _user: req.user.id
    });

    const recipe = await newRecipe.save();

    res.send(recipe);
  }
);

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { id } = req.params;

    const recipe = await Recipe.findByIdAndUpdate(id, req.body, { new: true });

    res.send(recipe);
  }
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { id } = req.params;

    await Recipe.findByIdAndRemove(id);

    res.status(200).send();
  }
);

module.exports = router;
