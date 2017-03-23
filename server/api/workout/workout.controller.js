const Workout = require('./workout.model');

const controller = {};

controller.workouts = (req, res, next) => {
  Workout.find({ owner: req.user.payload.id }).then((workouts) => {
    res.status(200).json(workouts);
  }).catch((error) => {
    next(error);
  });
};

controller.workout = (req, res, next) => {
  Workout.findById(req.params.id).then((workout) => {
    res.status(200).json(workout);
  }).catch((error) => {
    next(error);
  });
};

controller.createWorkout = (req, res, next) => {
  const workout = req.body;
  workout.owner = req.user.payload.id;

  Workout.create(workout, (error, document) => {
    if (error) {
      return next(error);
    }
    return res.status(201).json(document);
  });
};

controller.createExercise = (req, res, next) => {
  Workout.findByIdAndUpdate(req.params.workout_id, {
    $push: {
      exercises: {
        name: req.body.name,
      },
    },
  }, (error, document) => {
    if (error) {
      return next(error);
    }
    return res.status(201).json(document);
  });
};

controller.createSet = (req, res, next) => {
  Workout.findOne({
    _id: req.params.workout_id,
  }).then((workout) => {
    workout.exercises.id(req.params.exercise_id).sets.push({
      weight: req.body.weight,
      reps: req.body.reps,
    });

    workout.save((error) => {
      if (error) {
        next(error);
      } else {
        res.status(201).json(workout);
      }
    });
  }).catch((error) => {
    next(error);
  });
};


module.exports = controller;
