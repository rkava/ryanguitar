export default function notification( type, message ) {

	let box = document.getElementsByClassName( 'notif-box' )[ 0 ]

	let button = document.getElementsByTagName( 'button' )[ 0 ]

	box.style.backgroundColor = type === 'error' ? 
		'var(--error)' :
		'var(--success)'

	document.removeEventListener( 'keyup', keyUp ) 

	box.innerHTML  = message 
	button.onclick = undefined

	box.classList.toggle( 'fade' )

	setTimeout( () => {

		box.classList.toggle( 'fade' ) 

		window.onload() 
		
	}, 2500 )

}