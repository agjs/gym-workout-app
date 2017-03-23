const controller = {};


controller.getRoot = (req, res, next) => {
  res.json({
    message: 'Welcome to Workout API v.10',
  });
  next();
};


module.exports = controller;
