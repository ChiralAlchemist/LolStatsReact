// const express = require("express")
//const webpack = require('webpack');
//const webpackMiddleware = require('webpack-dev-middleware');
//const config = require('./webpack.config.js');
//
// const _ = require("lodash")
//
// const app = express()
// const port = process.env.port || 3000
// app.use(webpackMiddleware(webpack(config)))
//
// app.listen(port)
// console.log('Listening on port '+ port)

const path = require('path');
const express = require('express');
//const webpackHotMiddleware = require('webpack-hot-middleware');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 8080;//isDeveloping ? 8080 : ;
const app = express();

var assert = require('assert');

// Connection URL
var dataBaseUrl = 'mongodb://localhost:27017/myproject';

// Use connect method to connect to the server
app.mongoose = require('mongoose');
app.mongoose.connect(dataBaseUrl);
// Use native promises
app.mongoose.Promise = global.Promise;
//assert.equal(query.exec().constructor, global.Promise);
app.dataBaseConnection = app.mongoose.connection;
app.dataBaseConnection.on('error', console.error.bind(console, 'connection error:'));
app.dataBaseConnection.once('open', function () {
  console.log('connected to mongoose')
})

require("./backend/schemaAttributes.js")(app)
// MongoClient.connect(url, function(err, db) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");
//
//   db.close();
// });
//
// if (isDeveloping) {
//   const compiler = webpack(config);
//   const middleware = webpackMiddleware(compiler, {
//     publicPath: config.output.publicPath,
//     contentBase: 'src',
//     stats: {
//       colors: true,a
//       timings: true,
//       chunks: false,
//       chunkModules: false,
//       modules: false
//     }
//   });
//   console.log('hello')
//   app.use(middleware);
//   app.use(webpackHotMiddleware(compiler));
//   app.get('*', function response(req, res) {
//     console.log('im here')
//     app.use(express.static(__dirname + '/public'));/
//     res.sendFile(path.join(__dirname + "/public/index.html"));
//     // res.write(middleware.fileSystem.readFileSync(path.join(__dirname, '/public/index.html')));
//     //res.end();
//   });
// } else {
  app.use(express.static(__dirname + '/public'));
  console.log('im here 2')
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
