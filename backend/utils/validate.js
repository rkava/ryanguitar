const parameters = require( '../routing.json' ).parameters
const exists     = require( '../utils/exists' ) 
const path       = require( 'path' ) 
const { isReadable } = require('stream')

/**
 * backend/utils/validate.js
 * 
 * Express middleware to check that requests:
 * 	- have all required parameters 
 * 	- have the correct auth credentials 
 *  - specify an existing user 
 */
module.exports = async function( req, res, next ) {

	let url = req.originalUrl.split( '?' )[ 0 ] 

	if( parameters[ url ] ) {
	
		for( let x in parameters[ url ] ) { 
		
			let parameter = parameters[ url ][ x ]

			if( !req.query[ parameter ] ) {
		
				return res.status( 400 ).send({
					status: 400, message: 'bad request'
				})
			}

			if( parameter === 'auth' ) {

				if( req.query.auth !== process.env.ADMIN_TOKEN ) {

					return res.status( 400 ).send({
						status: 400, message: 'bad auth token'
					})
				}
			}

			if( parameter === 'username' ) {

				let profilePath = path.resolve( 
					__dirname, '../../userdata/' + req.query.username + '.json' 
				)

				let fileExists = await exists( profilePath )

				res.locals.profile = {
					  path: profilePath,
					exists: fileExists
				}

			}

		}
	}

	return next()	
}