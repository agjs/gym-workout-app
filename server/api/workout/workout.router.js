const router = require('express').Router();
const controller = require('./workout.controller');

router.route('/').get(controller.workouts).post(controller.createWorkout);
router.route('/:id').get(controller.workout);
router.route('/exercises/:workout_id').put(controller.createExercise);
router.route('/reps/:workout_id/exercise/:exercise_id').put(controller.createSet);

module.exports = router;
