const exists = require( '../utils/exists' ) 
const fs     = require( 'fs/promises' ) 
const path   = require( 'path' )

/**
 * backend/update.js
 * 
 * Handles updating user profiles
 */
module.exports = async function( req, res ) {

	let user    = req.query.username
	let message = req.query.message 

	if( !res.locals.profile.exists ) {
		return res.status( 400 ).send( 
			{ status: 400, message: 'User not found' } 
		) 
	} 

	try {		
		
		let data = require( res.locals.profile.path )
		
		data.messages.unshift({ 
			message: message,
			date: new Date().toLocaleDateString( 'en-gb' ) 
		})

		await fs.writeFile( res.locals.profile.path, JSON.stringify( data ) )

		return res.status( 200 ).send(
			{ status: 200, message: 'Profile updated successfully' }
		)

	} catch( e ) {
	
		return res.status( 400 ).send(
			{ status: 400, message: e.message } 
		) 
	}

}