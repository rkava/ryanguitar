const routing  = require( './routing.json' )
const validate = require( './utils/validate' )
const render   = require( './utils/render' )
const limiter  = require( 'express-rate-limit' ) 
const session  = require( 'express-session' ) 
const cookies  = require( 'cookie-parser' )
const parser   = require( 'body-parser' )   
const express  = require( 'express' )
const https    = require( 'https' ) 
const http     = require( 'http' ) 
const fs       = require( 'fs' ) 
const app      = express() 

require( 'dotenv' ).config() 

const key  = fs.readFileSync( process.env.HTTPS_KEY ) 
const cert = fs.readFileSync( process.env.HTTPS_CERT )


const sessionSettings = {
	cookie: { maxAge: 2629800000 },
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true, 
}

const limiterSettings = {
	windowMs: process.env.RATELIMIT_WINDOW,
	     max: process.env.RATELIMIT_REQUESTS,
	standardHeaders: true,
	  legacyHeaders: false
}

app.use( validate )
app.use( cookies() ) 
app.use( parser.json() ) 
app.use( express.static( 'public' ) )
app.use( session( sessionSettings ) )
app.use( limiter( limiterSettings ) )


app.all( '*', ( req, res, next ) => 
	req.secure ? next() : 
		res.redirect( 'https://' + req.hostname + req.url ) )


for( let x in routing.handlers ) 
	app.get( x, require( routing.handlers[ x ] ) )


for( let x in routing.views ) 
	app.get( x, ( req, res ) => render( routing.views[ x ], req, res ) )


app.use( ( req, res, next ) =>
	res.status( 404 ).send( { status: 404, message: 'resource not found'} ) )	


https.createServer( { key: key, cert: cert }, app )
.listen( process.env.HTTPS_PORT, () => 
	console.log( 'HTTPS Listening' ) )


http.createServer( app )
.listen( process.env.HTTP_PORT, () => 
	console.log( 'HTTP Listening' ) )