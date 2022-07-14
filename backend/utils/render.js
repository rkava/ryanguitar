const pug 		= require( 'pug' ) 
const redirects = require( '../routing.json' ).redirect_logged_in 

/**
 * Renders pug templates for paths specified 
 * in the routing configuration, and evaluates 
 * variables passed to the views 
 */
module.exports = function( view, req, res ) {

	let url  = req.originalUrl.split( '?' )[ 0 ] 

	for( let x in redirects ) {
		if( url === redirects[ x ] && req.session.user ) 
			return res.redirect( '/' ) 
	}

	/*
		EVALUATE IF A PASSWORD RESET TOKEN
		IS CORRECT HERE, 'validResetToken' 
		NEEDS TO BE PASSED TO THE RENDERER
	*/ 

	let data = {
		  loginPage: ( url === '/login' ),
		profilePage: ( url === '/profile' )  
	}

	if( req.session.user ) {
		data.username = req.session.user.username
			data.name = req.session.user.name 
		data.loggedIn = true 
	} 

	return res.send( 
		pug.renderFile( 
			'views/' + view + '.pug', data 
		)
	)

}