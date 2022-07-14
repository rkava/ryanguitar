const fs   = require( 'fs/promises' )
const path = require( 'path' )  
/**
 * utils/exists.js
 * 
 * Asynchronously checks if a specified file exists
 */
module.exports = async function( p ) {

	//https://sabe.io/blog/node-check-file-exists-async-await
	return !!( await fs.stat( path.resolve( __dirname, p ) ).catch( e => false ) )
} 