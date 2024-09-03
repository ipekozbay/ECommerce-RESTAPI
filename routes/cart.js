const router = require('express').Router();
const Cart = require('../models/Cart');
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('./verifyToken');

// CREATE
router.post('/', verifyToken, async (req, res) => {
  try {
    const newCart = await Cart.create(req.body);
    res.status(200).json(newCart);
  } catch (err) {
    res.status(500).json({ message: 'Error creating cart', error: err.message });
  }
});

// UPDATE
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    const [updated] = await Cart.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    if (updated) {
      const updatedCart = await Cart.findByPk(req.params.id);
      res.status(200).json(updatedCart);
    } else {
      res.status(404).json({ message: 'Cart not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error updating cart', error: err.message });
  }
});

// DELETE
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    const deleted = await Cart.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(200).json('Cart has been deleted...');
    } else {
      res.status(404).json({ message: 'Cart not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error deleting cart', error: err.message });
  }
});

// GET USER CART
router.get('/find/:userId', verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({ where: { userId: req.params.userId } });
    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: 'Cart not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving cart', error: err.message });
  }
});

router.get('/', verifyTokenAndAdmin, async (req, res) => {
  try {
    // Tüm sepetleri alın
    const carts = await Cart.findAll();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving carts', error: err.message });
  }
});

module.exports = router;
