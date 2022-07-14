import notification from "./utils/notification"

window.onload = function() {

    document.getElementById( 'submit-login' ).onclick = submitLogin 
	document.addEventListener( 'keyup', keyUp )
}

const keyUp = event => { if( event.code === 'Enter' ) submitLogin() }

function submitLogin() { 

	let username = document.getElementById( 'username-login' ).value
	let password = document.getElementById( 'password-login' ).value 

	if( !username || !password ) 
		return notification( 'error', 'Please fill in both fields' )

	fetch( '/api/login' + 
		'?username=' + username +
		'&password=' + password 	
	)
	.then( r => r.json() ) 
	.then( d => d.status === 200 ? 
		window.location.replace( '/' ) :
		notification( 'error', d.message )
	)

}