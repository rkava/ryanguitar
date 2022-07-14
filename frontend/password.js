import notification from "./utils/notification"


window.onload = function() {

	//perform some logic here relating to checking if there's a 
	//parameter on the url with name 'token', and directing 
	//the execution accordingly 

	document.getElementById( 'submit-change' ).onclick = submitChange
	document.addEventListener( 'keyup', keyUp )
}

const keyUp = event => { if( event.code === 'Enter' ) submitChange() }

function submitChange() {

	let username = document.getElementById( 'username-change' ).value
	let email    = document.getElementById( 'email-change' ).value 

	if( !username || !email ) 
		return notification( 'error', 'Please fill in both fields' )

	fetch( '/api/password/request' + 
		'?username=' + username +
		'&email=' + email 	
	)
	.then( r => r.json() ) 
	.then( d => d.status === 200 ? 
		notification( 'success', 'Password reset link sent' ) :
		notification( 'error', d.message ) 
	)

}
