const exists = require( '../utils/exists'  ) 
const hash   = require( '../utils/hash' ) 
const fs 	 = require( 'fs/promises' ) 
const path   = require( 'path' )

/**
 * backend/handlers/profile.create.js 
 * 
 * Endpoint used by the admin control panel to 
 * create a user profile 
 */
module.exports = async function( req, res ) {

	let username   = req.query.username 
	let iterations = Math.floor( ( Math.random() * 100 ) + 30 ) 

	if( res.locals.profile.exists ) {
		return res.status( 400 ).send( 
			{ status: 400, message: "User already exists" }
		)
	}  

	let data = {
		username: username,
		name: req.query.name,
		
		iterations: iterations,
		password: hash( username, iterations ) ,
		password_changed: false, 
		
		email_alerts: false, 
		email_address: '', 
		
		messages: [{ 
			message: `
			Welcome to my website! Remember to: 	
			<ul>
				<li> Change the default password
				<li> Update your email address
				<li> Enable email alerts for profile updates
			</ul>`,
			date: new Date().toLocaleDateString( 'en-GB' )
		}]
	}

	try {
		
		await fs.writeFile( res.locals.profile.path, JSON.stringify( data ) )

		return res.status( 200 ).send( 
			{ status: 200, message: 'Profile created successfully' } 
		)

	} catch( e ) {
		
		console.error( e ) 

		return res.status( 400 ).send( 
			{ status: 400, message: e.message } 
		)

	}

}