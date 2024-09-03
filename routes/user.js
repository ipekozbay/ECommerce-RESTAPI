require('winston-syslog');

const User = require("../models/User");
const router = require("express").Router();

// UPDATE
router.put("/:id", async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await User.destroy({where: {id: req.params.id}});

    if(user){
      res.status(200).json("User has been deleted...");
    }else{
      res.status(404).json("User not found...");

    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET USER
router.get("/find/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});


// GET ALL

router.get("/",async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(err);
  }
})


// GET USERS BY ADDRESS
router.get('/address/:city', async (req, res) => {
  try {
    const users = await User.findAll({ where: { address: req.params.city } });

    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found in this city.' });
    }
    res.status(200).json(users);

  } catch (err) {
    console.error("Error occurred: ", err.message);
    res.status(500).json({ message: 'Internal server error.' });
  }
});




// GET USERS BY USERNAME
router.get('/username/:username', async (req, res) => {
  try {
    const users = await User.findAll({ where: { username: req.params.username } });

    if (users.length === 0) {
      return res.stastus(404).json({ message: 'No users found in this username.' });
    }
res.status(200).json(users);

  } catch (err) {
    console.error("Error occurred: ", err.message);
    res.status(500).json({ message: 'Internal server error.' });
  }
});




// GET USERS BY MAIL
router.get('/email/:email', async (req, res) => {
  try {
    const users = await User.findAll({ where: { email: req.params.email } });

    if (users.length === 0) {
      return res.stastus(404).json({ message: 'No users found in this email.' });
    }
res.status(200).json(users);

  } catch (err) {
    console.error("Error occurred: ", err.message);
    res.status(500).json({ message: 'Internal server error.' });
  }
});






// GET USER STATS
router.get("/stats", async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

