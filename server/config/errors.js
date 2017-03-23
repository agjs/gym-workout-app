module.exports = (err, req, res) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Invalid token. Only authorized persons are allowed access.');
  } else {
    res.status(500).send(err.message);
  }
};
