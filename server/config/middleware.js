const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const jwt = require('express-jwt');
const mongoose = require('mongoose');

module.exports = (app) => {
  mongoose.Promise = global.Promise;
  app.use(express.static(path.join(__dirname, '../../', '/client')));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false,
  }));

  app.use(jwt({
    secret: '12345',
  }).unless({
    path: ['/auth/login', '/auth/register'],
  }));

  app.use(morgan('combined'));
};
