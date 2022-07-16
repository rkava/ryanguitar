const path = require( 'path' ) 

/**
 * backend/handlers/profile.get.js 
 * 
 * Retrieves all information required on the profile 
 * page for the currently logged in req.session.user 
 */
module.exports = function( req, res ) {

	//can only GET information if logged in
	if( !req.session.user ) 
		return res.status( 400 ).send(
			{ status: 400, message: 'user must be logged in' }
		)

	let user = require( 
		path.resolve(
			__dirname, '../../userdata/' + req.session.user.username
		)
	)

	//Do a page system for profile messages, where a request has to 
	//specify a 'page' number of messages (improve load times for 
	//users with a large number of messages)
	res.status( 200 ).send({
		status: 200, 
		profile: {
			    name: user.name, 
			username: user.username,               
			   email: user.email_address,                
			messages: user.messages.slice( 0, 8 ),
			  total_messages: user.messages.length,
			password_changed: user.password_changed, 
			    email_alerts: user.email_alerts  
		}
	})

}