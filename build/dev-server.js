require('./check-versions')();

var config = require('../config');
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn');
var path = require('path');
var express = require('express');
var webpack = require('webpack');
var proxyMiddleware = require('http-proxy-middleware');
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf');


// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port;
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser;
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable;

var app = express();


//发生数据请求
var content = require('../mock/home/content');
var banner = require('../mock/home/banner');
var upload = require('../mock/home/upload');
var detail = require('../mock/topic/detail');
var chapterList = require('../mock/topic/chapterList');
var apiRouter = express.Router();

//正文内容
apiRouter.get('/home/content', function (req, res) {
  res.json({
    errno: 0,
    data: content
  });
});


//banner图内容
apiRouter.get('/home/banner', function (req, res) {
  res.json({
    errno: 0,
    data: banner
  });
});

//加载更多内容
apiRouter.get('/home/upload', function (req, res) {
  res.json({
    errno: 0,
    data: upload
  });
});

//书籍详情页
// 20170423134531
// https://api.doufu.la/index.php/topic/novel?topic_id=248821&tf_webapp=1&c_av=4.3.0
apiRouter.get('/topic/detail', function (req, res) {
  res.json({
    errno: 0,
    data: detail
  });
});

apiRouter.get('/topic/chapterList', function (req, res) {
  res.json({
    errno: 0,
    data: chapterList
  });
});


app.use('/api', apiRouter);

var compiler = webpack(webpackConfig);

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
});

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {
  }
});
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({action: 'reload'})
    cb()
  })
});


// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context];
  if (typeof options === 'string') {
    options = {target: options}
  }
  app.use(proxyMiddleware(options.filter || context, options))
});

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

// serve webpack bundle output
app.use(devMiddleware);

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware);

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'));

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
});

console.log('> Starting dev server...');
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n');
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
});

var server = app.listen(port);

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
};
