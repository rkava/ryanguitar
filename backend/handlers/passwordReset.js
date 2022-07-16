const exists = require( '../utils/exists' ) 
const hash   = require( '../utils/hash')
const fs     = require( 'fs/promises' )  

/**
 * backend/passwordreset.js
 * 
 * Resets a user's password to the default value 
 */
module.exports = async function( req, res ) {

    let user  = req.query.username 

	if( !res.locals.profile.exists ) {
		return res.status( 400 ).send( 
			{ status: 400, message: 'User not found' }
		)
	} 

    try {
		let data = await fs.readFile( res.locals.profile.path, 'utf8' )

        data.iterations = Math.floor( ( Math.random() * 100 ) + 30 ) 
        data.password   = hash( user, data.iterations ) 

		await fs.writeFile( res.locals.profile.path, JSON.stringify( data ) )

		return res.status( 200 ).send(
			{ status: 200, message: 'Password reset successfully' }
		)

	} catch( e ) {
		return res.status( 400 ).send(
			{ status: 400, message: e.message } 
		) 
	}

}