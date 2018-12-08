let we = null

$(function(){
	if(window.username){
		startChat()
	}
})

function startChat() {
	ws = adonis.Ws().connect()

	ws.on('open', ()=>{
		$('.connection-status').addClass('connected')
		subscribeToChannel()
	})

	ws.on('error', ()=>{
		$('.connection-status').removeClass('connected')
	})
}

function subscribeToChannel() {
	const chat = ws.subscribe('chat:8812')

	chat.on('error', ()=> {
		$('.connection-status').removeClass('connected')
	})

	chat.on('message', (message)=>{
		if(message.type == "message"){
			$('.messages').append(`<div class="message"><h3> ${message.username} </h3> <p> ${message.body} </p> </div>`)
		}
	})
}

$('#message').keyup(function (e) {
	if (e.which === 13) {
		e.preventDefault()

		const message = $(this).val()
		$(this).val('')

		ws.getSubscription('chat:8812').emit('message', {
			username: window.username,
			body: message,
			type: 'message'
		})
		return
	}
})

$('button').on('click', function(){
	let button_id = this.id
	console.log(button_id)
	var vars = {}
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    console.log(vars)
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('myParam');
    console.log(myParam)
	ws.getSubscription('chat:'+vars.room_id).emit('message', {
		username: vars.username,
		body: name,
		type: vars.type,
	})
	return 
})
