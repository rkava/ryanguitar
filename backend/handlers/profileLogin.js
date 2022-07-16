const hash   = require( '../utils/hash' ) 

/**
 * backend/handlers/login.js 
 * 
 * Authenticates a user and binds their 
 * information as a session variable 
 */
module.exports = async function( req, res ) {

	let user = req.query.username 
	
	if( !res.locals.profile.exists ) {

		return res.status( 400 ).send({
			status: 400, message: 'No such user'
		})
	
	}

	let data = require( res.locals.profile.path )

	let password = hash( req.query.password, data.iterations ) 

	if( password === data.password ) {

		req.session.user = {
			username: data.username,
			    name: data.name
		}
		req.session.save() 

		return res.status( 200 ).send({
			status: 200, message: 'Login successful' 
		})

	} else {

		return res.status( 400 ).send({
			status: 400, message: 'Invalid password' 
		})
	
	}

}