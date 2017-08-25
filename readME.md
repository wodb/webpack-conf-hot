# webpack+express模块热重载

## webpack-dev-middleware
> 用来组织包装webpack使其可以变成中间件容器。

## webpack-hot-middleware
> 模块热重载的重要一环

## 开始构建

```
	devtool:'cheap-module-eval-source-map', // 开发模式推荐用cheap-module-eval-source-map 生产推荐用cheap-module-source-map
	entry:{
		app:['webpack-hot-middleware/client','./src/main.js'] // 入口文件.如果是要热重载请加{webpack-hot-middleware/client}
	},
	output:{
		path:path.resolve(__dirname,'dist'), // 定义编译完成输入目录(不是在内存中)
		publicPath:'/dist', //编译好的文件，在服务器的路径,这是静态资源引用路径
		filename:'bundle.js' // 文件名称[name][chunkhash]
	},
	module:{ // 加载器
		rules:[
			{
				test:/\.js$/,
				include:[path.resolve(__dirname, 'src')],
				exclude:[path.resolve(__dirname, 'node_modules')],
				loader:'babel-loader',
				options: {
	                "presets": ["es2015","stage-0","stage-1","stage-2","stage-3"]
	            }
			},{
				test:/\.vue$/,
				include:[path.resolve(__dirname,'src')],
				exclude:[path.resolve(__dirname,'node_modules')],
				loader:'vue-loader'
			},{
				test:/\.css$/,
				include:[path.resolve(__dirname,'src')],
				exclude:[path.resolve(__dirname,'node_modules')],
				loader:'css-loader',
			}
		]
	},
	resolve: {
        extensions: ['.js', '.vue'] // 设置扩展名
    },
    plugins:[
    	new webpack.DefinePlugin({
    		'process.env.NODE_ENV': '"development"' // 定义开发环境或者用JSON.stringify("development")
    	}),
    	new webpack.HotModuleReplacementPlugin(), // 模块热替换
    	new webpack.optimize.OccurrenceOrderPlugin(),  //目前还不知道干啥用的
	    new webpack.NoEmitOnErrorsPlugin(),// 即使有错误也不中断
    	new HtmlWebpackPlugin({ //生成html模版
    		title:'HtmlWebpackPlugin', // 使用了template 这个就不生效了
    		filename:'./index.html',
    		template:'./index.html',
    		hash:true
    	})
    ]
```

```
var webpack = require('webpack'),
	webpackDevMiddleware = require('webpack-dev-middleware'),
	webpackHotMiddleware = require('webpack-hot-middleware'),
	webpackDevConfig = require('./webpack.config.hot.js'),
	express = require('express')

var compiler = webpack(webpackDevConfig); 对webpack进行配置

var app = express() // 使用express作为服务器
// 使用中间件
app.use(webpackDevMiddleware(compiler,{ 
	publicPath:webpackDevConfig.output.publicPath, // 应当和webpack路径保持一致
	hot: true,  // 是否启用热更新
	// noInfo:true, // 编译时是否有信息看个人(比较喜欢打开看着它)
	progress:true, // 显示进度
	inline: true, // 是否实时刷新，即代码有更改，自动刷新浏览器
	stats:{
		colors:true // 颜色
	}
}))

app.use(webpackHotMiddleware(compiler));// 进行热重载

// 其余全部返回index.html
app.get("*", function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.listen(3000,() => {
	// 开启3000端口
	console.log('server 3000')
})
```