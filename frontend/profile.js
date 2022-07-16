window.onload = function() {
	
	fetch( '/api/profile/get' )
	.then( r => r.json() )
	.then( createProfile )
}

function createProfile( data ) { 

	let profile = data.profile
	let parent  = document.getElementsByClassName( 'container' )[ 0 ] 

	console.log( profile ) 

	for( let i in profile.messages ) {

		const entry = document.createElement( 'div' ) 
		entry.className = 'panel'

		entry.innerHTML = `
			<span class="message-date" >
				Message from Ryan, posted: ${ profile.messages[ i ].date }
		   	</span>
		    <div class="divider" style="border-top: 2px solid var(--tertiary) "></div>
			<span class="message-content"> 
				${ profile.messages[ i ].message } 
			</span>`

		parent.appendChild( entry ) 

	}

}