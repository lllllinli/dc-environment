
var express = require('express'),
    path = require('path'),
    consolidate = require('consolidate');

var isDev = process.env.NODE_ENV !== 'production';
var app = express();
var port = 3000;

app.engine('html', consolidate.ejs);
app.set('view engine', 'html');
app.set('views', path.resolve(__dirname, './views'));

// local variables for all views
app.locals.env = process.env.NODE_ENV || 'dev';
app.locals.reload = true;



if (isDev) {
  var webpack = require('webpack'),
      webpackDevMiddleware = require('webpack-dev-middleware'),
      webpackHotMiddleware = require('webpack-hot-middleware'),
      webpackDevConfig = require('../webpack.config.js');

  var compiler = webpack(webpackDevConfig);

  // attach to the compiler & the server
  app.use(webpackDevMiddleware(compiler, {

      // public path should be the same with webpack config
      publicPath: webpackDevConfig.output.publicPath,
      noInfo: true,
      stats: {
          colors: true
      }
  }));
  app.use(webpackHotMiddleware(compiler));

  // app.get('/', function (req, res) {
  //   // res.send('Hello World!');
  //   res.sendFile(path.join(__dirname+ '/view/pages/index.html' ));
  // });
  //
  // app.listen(3000, function () {
  //   console.log('Example app listening on port 3000!');
  // });

  require('./routes')(app);

  // add "reload" to express, see: https://www.npmjs.com/package/reload
  var reload = require('reload');
  var http = require('http');

  var server = http.createServer(app);
  reload(server, app);

  server.listen(port, function(){
      console.log('App (dev) is now running on port 3000!');
  });

} else {

  app.use(express.static(__dirname + '/view'));
  //Store all HTML files in view folder.
  app.use(express.static(__dirname + '/script'));
  //Store all JS and CSS in Scripts folder.
  app.use('/static', express.static(__dirname + '/public'));
}
