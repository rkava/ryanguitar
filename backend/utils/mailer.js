const mailer = require( 'nodemailer' ) 
const google = require( 'googleapis' ).google 
const oauth2 = google.auth.OAuth2

module.exports = function( to, subject, content ) {

	const transport = mailer.createTransport({

		service: 'gmail',
		auth: {
			type: 'OAuth2',
			user: 	      process.env.EMAIL_ADDRESS, 
			clientId:     process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
			refreshToken: process.env.GOOGLE_REFRESH,
			accessToken:  process.env.GOOGLE_ACCESS, 
		}
	})

	transport.sendMail( {

		from: `ryanguitar.uk <${process.env.EMAIL_ADDRESS}>`,
		subject: subject,
		html: content,		
		to: to

	}, ( e, result ) => {

		if( e ) console.log( e ) 

		transport.close() 
	})

}