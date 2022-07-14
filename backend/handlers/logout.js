/**
 * backend/handlers/logout.js
 * 
 *  Logs a user out of their account 
 */
module.exports = function( req, res ) {

	if( req.session.user ) req.session.user = undefined

	req.session.save() 

	res.redirect( '/' ) 
}