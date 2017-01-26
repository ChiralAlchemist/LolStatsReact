const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config.js');

const path = require('path');
const express = require('express');
const webpackHotMiddleware = require('webpack-hot-middleware');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 8080 : process.env.PORT;
const app = express();

var assert = require('assert');

// Connection URL
var dataBaseUrl = 'mongodb://localhost:27017/myproject';

// Use connect method to connect to the server
app.mongoose = require('mongoose');
app.mongoose.connect(dataBaseUrl);
// Use native promises
app.mongoose.Promise = global.Promise;
app.dataBaseConnection = app.mongoose.connection;
app.dataBaseConnection.on('error', console.error.bind(console, 'connection error:'));
app.dataBaseConnection.once('open', function () {
  console.log('connected to mongoose')
})

require("./backend/schemaAttributes.js")(app)

app.use(express.static(__dirname + '/public'));

app.get('/', function response(req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

require('./backend/routes.js')(app)

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
