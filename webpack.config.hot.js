const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	devtool:'cheap-module-eval-source-map',
	entry:{
		app:['webpack-hot-middleware/client','./src/main.js']
		// app:'./src/main.js'
	},
	output:{
		path:path.resolve(__dirname,'dist'),
		publicPath:'/dist', //编译好的文件，在服务器的路径,这是静态资源引用路径
		filename:'bundle.js'
	},
	module:{
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
        extensions: ['.js', '.vue']
    },
    plugins:[
    	new webpack.DefinePlugin({
    		'process.env.NODE_ENV': '"development"'
    	}),
    	new webpack.HotModuleReplacementPlugin(), // 模块热替换
    	new webpack.optimize.OccurrenceOrderPlugin(), 
	    new webpack.NoEmitOnErrorsPlugin(),
    	new HtmlWebpackPlugin({
    		title:'HtmlWebpackPlugin', // 使用了template 这个就不生效了
    		filename:'./index.html',
    		template:'./index.html',
    		hash:true
    	})
    ]
}