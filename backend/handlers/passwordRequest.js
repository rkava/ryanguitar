const exists = require( '../utils/exists' )
const mailer = require( '../utils/mailer' )  
const fs     = require( 'fs/promises' ) 
const path   = require( 'path' )
const pug    = require( 'pug' ) 

/**
 * backend/handlers/password.request.js
 * 
 * Manages password reset requests
 */
module.exports = async function( req, res ) {

	let user  = req.query.username 
	let email = req.query.email 

	if( !res.locals.profile.exists ) {
		return res.status( 400 ).send({
			status: 400, message: 'User not found'
		})
	}
	
	let data = require( res.locals.profile.path )

	if( !data.email_address ) {

		return res.status( 400 ).send({
			status: 400, 
			message: 'Contact Ryan for assistance'
		})
	}

	if( email === data.email_address ) {

		let resetToken = require( 'crypto' ).randomBytes( 24 ).toString( 'hex' ) 

		let tokenDir = path.resolve( __dirname, '../tokens.json' )

		let tokens = require( tokenDir )

		if( tokens[ user ] ) {

			return res.status( 400 ).send({
			
				status: 400, message: 'Reset link already sent'
			})

		} else { tokens[ user ] = resetToken }

		await fs.writeFile( tokenDir, JSON.stringify( tokens ) )
		
		let url = process.env.URL + 'password/confirm' + 
			'?token=' + resetToken +
			'&username=' + data.username  

		mailer( email, 'Password reset', 
			pug.renderFile( 'views/emails/reset.pug', { url: url, name: data.name } )
		)

		return res.status( 200 ).send({

			status: 200, message: 'Reset link sent'
		})

	} else {

		return res.status( 400 ).send({

			status: 400, message: 'Incorrect email address'
		})

	}

}