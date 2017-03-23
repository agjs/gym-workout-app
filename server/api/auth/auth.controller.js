const User = require('../user/user.model');

const bcrypt = require('bcrypt');

const jsonwebtoken = require('jsonwebtoken');

const controller = {};


controller.login = (req, res, next) => {
  const {
    username,
    password,
  } = req.body;

  User.findOne({ username }, (error, user) => {
    if (error) {
      return next(error);
    }

    if (!user) {
      return next(new Error('User not found.'));
    }

    user.validPassword(password, (passwordError) => {
      if (passwordError) {
        next(passwordError);
      } else {
        const payload = {
          id: user.id,
          username: user.username,
        };

        const token = jsonwebtoken.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          payload,
        }, '12345');

        res.status(200).json({ token });
      }
    });
  });
};

controller.register = (req, res, next) => {
  bcrypt.genSalt(10, (er, salt) => {
    bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
      if (err) {
        next(err);
      } else {
        User.create({
          username: req.body.username,
          password: hashedPassword,
        }, (error, user) => {
          if (error) {
            next(error);
          } else {
            res.status(201).json(user);
          }
        });
      }
    });
  });
};


controller.logout = (req, res, next) => {
  req.logout();
  next();
};


module.exports = controller;
