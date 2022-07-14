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
			{ status: 400, message: 'specified user does not exist' } 
		) 
	} 

	try {		
		
		let data = await fs.readFile( res.locals.profile.path )

		data = JSON.parse( data ) 

		data.messages.push({ 
			message: message,
			date: new Date().toLocaleDateString( 'en-gb' ) 
		})

		await fs.writeFile( res.locals.profile.path, JSON.stringify( data ) )

		return res.status( 200 ).send(
			{ status: 200, message: 'profile updated successfully' }
		)

	} catch( e ) {
	
		return res.status( 400 ).send(
			{ status: 400, message: e.message } 
		) 
	}

}