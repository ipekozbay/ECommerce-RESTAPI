const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

// REGISTER
router.post('/register', async (req, res) => {
  const { firstName, lastName, username, email, phone, address, password } = req.body;

  try {
    const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString();

    const newUser = await User.create({
      firstName,
      lastName,
      username,
      email,
      phone,
      address,
      password: encryptedPassword
    });

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json("Wrong credentials");
    }
const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

if (originalPassword !== password) {
  return res.status(401).json("Wrong credentials");
}

res.status(200).json("Login successful");

  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
});

module.exports = router;