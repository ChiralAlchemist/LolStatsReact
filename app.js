// const express = require("express")
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config.js');
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
const webpackHotMiddleware = require('webpack-hot-middleware');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });
  console.log('hello')
  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', function response(req, res) {
    console.log('im here')
    res.sendFile(__dirname + "/public/index.html");
    //res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'public/index.html')));
    //res.end();
  });
} else {
  app.use(express.static(__dirname + '/public'));
  console.log('im here 2')
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });
}

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
