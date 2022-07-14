const crypto = require( 'crypto' ) 

/**
 * utils/encrypt.js
 * 
 * Salts and encrypts the passed value string,
 * will repeat the process based on the passed
 * 'iterations' value
 */
module.exports = function( value, iterations ) {

	for( let x = 0; x < iterations; x ++ ) {

		value = crypto
			.createHash( 'sha512' )
			.update( value + process.env.HASH_SALT )
			.digest( 'base64' )
	}

	return value
}