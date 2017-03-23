const rootRouter = require('../api/root/root.router');
const workoutRouter = require('../api/workout/workout.router');
const userRouter = require('../api/user/user.router');
const authRouter = require('../api/auth/auth.router');
const path = require('path');

module.exports = (app) => {
  app.use('/api/', rootRouter);
  app.use('/api/users', userRouter);
  app.use('/auth', authRouter);
  app.use('/api/workouts', workoutRouter);
  app.all('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../', '/client/index.html'));
  });
};
