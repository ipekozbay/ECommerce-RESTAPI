const router = require('express').Router();
const Favorite = require('../models/Favorite');
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('./verifyToken');

// CREATE
router.post('/', verifyToken, async (req, res) => {
  try {
    const newFavorite = await Favorite.create(req.body);
    res.status(200).json(newFavorite);
  } catch (err) {
    res.status(500).json({ message: 'Error creating favorite', error: err.message });
  }
});

// UPDATE
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    const [updated] = await Favorite.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    if (updated) {
      const updatedFavorite = await Favorite.findByPk(req.params.id);
      res.status(200).json(updatedFavorite);
    } else {
      res.status(404).json({ message: 'Favorite not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error updating favorite', error: err.message });
  }
});

// DELETE
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    const deleted = await Favorite.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(200).json('Favorite has been deleted...');
    } else {
      res.status(404).json({ message: 'Favorite not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error deleting favorite', error: err.message });
  }
});

// GET USER FAVORITES
router.get('/find/:userId', verifyTokenAndAuthorization, async (req, res) => {
  try {
    const favorites = await Favorite.findAll({ where: { userId: req.params.userId } });
    res.status(200).json(favorites);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving favorites', error: err.message });
  }
});

// GET ALL
router.get('/', verifyTokenAndAdmin, async (req, res) => {
  try {
    const favorites = await Favorite.findAll();
    res.status(200).json(favorites);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving favorites', error: err.message });
  }
});

module.exports = router;
