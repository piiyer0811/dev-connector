const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// @route  api/auth
// @desc   test route
// @acess  protected
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (e) {
    console.error(e.message);
    res.status(500).send('server error');
  }
});

// @route  POST api/auth/
// @desc   Login user
// @acess  public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // console.log(req.body);

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      //Send/return Json web token

      const payload = {
        user: {
          id: user.id,
        },
      };

      const jwtSecret = config.get('jwtSecret');
      jwt.sign(
        payload,
        jwtSecret,
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) {
            throw err;
          } else {
            res.json({ token });
          }
        }
      );
    } catch (e) {
      console.error(e);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
