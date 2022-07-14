window.onload = function() {

	global.token = new URLSearchParams( window.location.search ).get( 'auth' )

	document.getElementById( 'submit-update' ).onclick = submitUpdate
	document.getElementById( 'submit-create' ).onclick = submitProfile  
	document.getElementById( 'submit-reset'  ).onclick = submitReset
}


function submitUpdate() {

	let username = document.getElementById( 'username-update' ).value 
	let message  = document.getElementById( 'message-update' ).value

	fetch( '/api/profile/update' + 
		'?username=' + username + 
		'&message=' + message + 
		'&auth=' +  token
	)
	.then( r => r.json() ) 
	.then( logOutput )
}


function submitProfile() {

	let username = document.getElementById( 'username-create' ).value
	let realname = document.getElementById( 'name-create' ).value

	fetch( '/api/profile/create' + 
		'?username=' + username + 
		'&name=' + realname + 
		'&auth=' +  token
	)
	.then( r => r.json() ) 
	.then( logOutput )
}


function submitReset() {

	let username = document.getElementById( 'username-reset' ).value 

	fetch( '/api/password/reset' + 
		'?username=' + username +
		'&auth=' + token 
	)
	.then( r => r.json() )
	.then( logOutput )

}


function logOutput( data ) {

	document.getElementById( 'output' )
		.value = JSON.stringify( data )
	
	document.getElementById( 'output-title' )
		.innerHTML = ` (${new Date().toTimeString().split(' ')[0]})`
}