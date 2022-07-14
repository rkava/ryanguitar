const obfuscate = require('webpack-obfuscator');
const path 		= require('path')

module.exports = {

	mode: 'production',
	
	entry: {
		   'login': './frontend/login.js',
		    'home': './frontend/home.js',
		 'profile': './frontend/profile.js',
		'password': './frontend/password.js',
		 'article': './frontend/article.js',
		   'admin': './frontend/admin.js'
	},
	
	output: {
		path: path.resolve( __dirname, './public/scripts' ),
		filename: '[name].min.js',
		sourceMapFilename: '[name].js.map'
	},
	
	plugins: [
		new obfuscate( { rotateStringArray: true, reservedStrings: [ '\s*' ] }, [] )
	],

	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				enforce: 'post',
				use: {
					loader: obfuscate.loader,
					options: {
						rotateStringArray: true,
						reservedStrings: [ '\s*' ]
					}
				}
			}	
		]
	}
}