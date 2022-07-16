import notification from "./utils/notification"


window.onload = function() {

	let path = window.location.pathname 

	if( path === '/password/change' ) requestChange() 

	if( path === '/password/confirm' ) confirmChange() 
}


function requestChange() {

	global.keyup = e => {  if( e.code === 'Enter' ) submitRequest() }

	document.getElementById( 'submit-request' ).onclick = submitRequest
	document.addEventListener( 'keyup', keyup )
}

function confirmChange() {

	global.keyup = e => { if( e.code === 'Enter' ) submitConfirm() }

	document.getElementById( 'submit-confirm' ).onclick = submitConfirm
	document.addEventListener( 'keyup', keyup )
}


function submitRequest() {

	let username = document.getElementById( 'username-request' ).value
	let email    = document.getElementById( 'email-request' ).value 

	if( !username || !email ) 
		return notification( 'error', 'Please fill in both fields' )

	fetch( '/api/password/request' + 
		'?username=' + username    +
		'&email='    + email 	
	)
	.then( r => r.json() ) 
	.then( d => d.status === 200 ? 
		notification( 'success', 'Password reset link sent' ) :
		notification( 'error', d.message ) 
	)

}


function submitConfirm() {

	const params = new URLSearchParams( window.location.search ) 

	let password = document.getElementById( 'password-change'  ).value
	let confirm  = document.getElementById( 'password-confirm' ).value 
	let token    = params.get( 'token' ) 
	let username = params.get( 'username' ) 

	if( !password || !confirm ) 
		return notification( 'error', 'Please fill in both fields' )

	if( password !== confirm ) 
		return notification( 'error', 'Passwords do not match' )

	fetch( '/api/password/change' + 
		'?password=' + password   +
		'&confirm='  + confirm    + 
		'&token='    + token      + 
		'&username=' + username  
	)
	.then( r => r.json() ) 
	.then( d => d.status === 200 ? 
		window.location.replace( '/' ) :
		notification( 'error', d.message ) 
	)

}