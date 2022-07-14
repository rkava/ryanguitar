const exists = require( '../utils/exists' )
const mailer = require( '../utils/mailer' )  
const fs     = require( 'fs/promises' ) 
const path   = require( 'path' )

/**
 * backend/handlers/password.request.js
 * 
 * Manages password reset requests
 */
module.exports = async function( req, res ) {

	let user  = req.query.username 
	let email = req.query.email 

	if( res.locals.profile.exists ) {
		return res.status( 400 ).send({
			status: 400, message: 'user not found'
		})
	}
	
	let data = await fs.readFile( res.locals.profile.path )

	data = JSON.parse( data ) 

	if( !data.email_address ) {

		return res.status( 400 ).send({
			status: 400, 
			message: 'Account has no email, contact Ryan for assistance'
		})
	}

	if( email === data.email_address ) {

		let resetToken = require( 'crypto' ).randomBytes( 24 ).toString( 'hex' ) 
		let tokenDir   = path.resolve( __dirname, '../../userdata/_reset_tokens.json' )

		let tokens = await fs.readFile( tokenDir )

		tokens = JSON.parse( tokens ) 

		if( tokens[ user ] ) {
			return res.status( 400 ).send({
				status: 400, message: 'reset link already sent'
			})
		} else { tokens[ user ] = resetToken }

		await fs.writeFile( tokenDir, JSON.stringify( tokens ) )
		
		sendemail( email, 'Password reset', `There will soon be a password reset link right here` )

		return res.status( 200 ).send({
			status: 200, message: 'reset link sent'
		})

	} else {

		return res.status( 400 ).send({
			status: 400, message: 'incorrect email address'
		})

	}

}