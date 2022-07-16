const pug 		= require( 'pug' ) 
const fs        = require( 'fs/promises' ) 
const path      = require( 'path' ) 

/**
 * backend/utils/render.js
 * 
 * Renders pug templates for paths specified 
 * in the routing configuration, and evaluates 
 * variables passed to the views 
 */
module.exports = async function( view, req, res ) {

	let data = {
		loginPage: res.locals.url === '/login',
	  profilePage: res.locals.url === '/profile', 
	   validToken: res.locals.validToken  
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