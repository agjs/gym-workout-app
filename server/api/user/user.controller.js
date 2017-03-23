const User = require('./user.model');
const Workout = require('../workout/workout.model');
const controller = {};


controller.me = (req, res, next) => {
  User.findById(req.user.payload.id)
    .select('-password')
    .then((user) => {
      Workout.find({ owner: user.id })
        .then((workouts) => {
          res.status(200).json({
            user,
            workouts,
          });
        });
    }).catch((error) => {
      next(error);
    });
};

controller.all = (req, res, next) => {
  User.find((error, users) => {
    if (error) {
      next(error);
    } else {
      res.status(200).json(users);
    }
  });
};


module.exports = controller;
