const redirects = require( '../routing.json' ).redirect_logged_in

/**
 * backend/utils/redirect.js
 * 
 * Express middleware to handle custom redirect scenarios 
 */
module.exports = function( req, res, next ) {

	let url  = req.originalUrl.split( '?' )[ 0 ] 


	//If a user is logged in, redirect them from certain 
	//places defined in /routing.json back to the homepage 
	for( let x in redirects ) {
		if( url === redirects[ x ] && req.session.user ) 
			return res.redirect( '/' ) 
	}


	//If a user attempts to view the profile page without being 
	//logged in to their account
	if( url === '/profile' && !req.session.user ) 
		return res.redirect( '/login' ) 


	//Log out and redirect to home path
	if( url === '/api/logout' ) {
		if( req.session.user ) req.session.user = undefined

		req.session.save() 

		return res.redirect( '/' ) 
	}

	next() 
}