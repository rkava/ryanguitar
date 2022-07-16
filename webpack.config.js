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
		new obfuscate( { 
			rotateStringArray: true, 
			reservedStrings: [ '\s*' ],
			compact: true,
			controlFlowFlattening: true,
			controlFlowFlatteningThreshold: 1,
			debugProtection: false,
			debugProtectionInterval: 4000,
			disableConsoleOutput: false,
			identifierNamesGenerator: 'hexadecimal',
			log: false,
			numbersToExpressions: true,
			renameGlobals: false,
			selfDefending: true,
			simplify: true,
			splitStrings: true,
			splitStringsChunkLength: 5,
			stringArray: true,
			stringArrayCallsTransform: true,
			stringArrayEncoding: ['rc4'],
			stringArrayIndexShift: true,
			stringArrayRotate: true,
			stringArrayShuffle: true,
			stringArrayWrappersCount: 5,
			stringArrayWrappersChainedCalls: true,    
			stringArrayWrappersParametersMaxCount: 5,
			stringArrayWrappersType: 'function',
			stringArrayThreshold: 1,
			transformObjectKeys: true,
			unicodeEscapeSequence: false
		}, [] )
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
			}
		]
	}
}