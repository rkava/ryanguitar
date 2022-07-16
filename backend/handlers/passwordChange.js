const hash = require( '../utils/hash' ) 
const fs   = require( 'fs/promises' ) 
const path = require( 'path' ) 


module.exports = async function( req, res ) {
	
	let password = req.query.password 
	let confirm  = req.query.confirm 
	let token    = req.query.token 
	let username = req.query.username  


	let tokens = await fs.readFile( 
		path.resolve( __dirname, '../tokens.json' ) 
	)

	tokens = JSON.parse( tokens ) 

	if( !tokens[ username ] ) 
		return res.status( 400 ).send({
			 status: 400, 
			message: 'User has not requested a password reset'
		}) 

	if( tokens[ username ] !== token )
		return res.status( 400 ).send({
			 status: 400, 
			message: 'Invalid token'
		}) 

	try {

		let data = require( res.locals.profile.path ) 

		data.iterations = Math.floor( ( Math.random() * 100 ) + 30 ) 
		data.password   = hash( password, data.iterations )

		tokens[ username ] = undefined 

		await fs.writeFile( res.locals.profile.path, JSON.stringify( data ) )
		await fs.writeFile( path.resolve( __dirname, '../tokens.json' ), JSON.stringify( tokens ) )

		return res.status( 200 ).send( 
			{ status: 200, message: 'Password changed successfully' }
		)

	} catch( e ) {
		return res.status( 400 ).send(
			{ status: 400, message: e.message }
		)
	}

}