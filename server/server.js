const express = require('express');
const debug = require('debug')('server');
const mongoose = require('mongoose');
const webpack = require('webpack');
const path = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const webpackPath = path.join(__dirname, '../', 'client', 'webpack.config');

const config = require(webpackPath);

const app = express();

const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

require('./config/middleware')(app);

require('./config/routes.js')(app);

app.use(require('./config/errors'));

app.listen(process.env.PORT || 8080, () => {
  mongoose.connect('mongodb://localhost/workout-app');
  debug(`Express server listening on port ${process.env.PORT || 8080}`);
});
