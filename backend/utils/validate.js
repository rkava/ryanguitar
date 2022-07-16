const params = require( '../routing.json' ).parameters
const exists = require( '../utils/exists' )
const path   = require( 'path' )

/**
 * backend/utils/validate.js
 * 
 * Express middleware which checks that requests:
 * 	- have all required parameters 
 * 	- have the correct auth credentials
 * And binds variables to res.locals 
 */
module.exports = async function( req, res, next ) {

	let url = req.originalUrl.split( '?' )[ 0 ] 

	res.locals.url = url 

	//Everything below this concerns endpoints expecting parameters
	if( !params[ url ] ) return next() 


	for( let x in params[ url ] ) { 
	
		//Expected parameter
		let parameter = params[ url ][ x ]

		//If request doesn't have an expected parameter, return 400 bad request 
		if( !req.query[ parameter ] ) {
			return res.status( 400 ).send({
				status: 400, message: 'bad request'
			})
		}

		//If the request expects an auth token and it is invalid, return 400 bad auth token
		if( parameter === 'auth' ) {
			if( req.query.auth !== process.env.ADMIN_TOKEN ) {
				return res.status( 400 ).send({
					status: 400, message: 'bad auth token'
				})
			}
		}

		//If the request expects a 'username' parameter, bind information to res.locals about the user
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

	//Token validation for password reset requests 
	if( url === '/password/confirm' ) {

		let tokens = require( '../tokens.json' ) 
		
		if( tokens[ req.query.username ] !== req.query.token ) 
			return res.status( 400 ).send({
				status: 400, 
				message: 'invalid token' 
			})

		res.locals.validToken = true 
	}

	return next()	
}