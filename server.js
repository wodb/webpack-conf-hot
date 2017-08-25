var webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    webpackDevConfig = require('./webpack.config.hot.js'),
    express = require('express')

var compiler = webpack(webpackDevConfig);

var app = express()

app.use(webpackDevMiddleware(compiler,{
	publicPath:webpackDevConfig.output.publicPath,
	hot: true,  // 是否启用热更新
	// noInfo:true,
	progress:true,
	inline: true, // 是否实时刷新，即代码有更改，自动刷新浏览器
	stats:{
		colors:true
	}
}))

app.use(webpackHotMiddleware(compiler));

app.get("*", function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.listen(3000,() => {
	console.log('server 3000')
})