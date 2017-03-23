module.exports = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      code: 401,
      message: 'You have no access to that resource.',
    });
  } else {
    next();
  }
};
