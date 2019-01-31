let we = null
$(function(){
	for (let index = 1; index <= 9; index++) {
		if(window.type != 'player_1')
			$("#button_"+index).addClass('disabled');
	}
})
$(function(){
	if(window.username){
		startChat()
	}
})

function startChat() {
	ws = adonis.Ws().connect()

	ws.on('open', ()=>{
		// $('.connection-status').addClass('connected')
		subscribeToChannel()
	})

	ws.on('error', ()=>{
		// $('.connection-status').removeClass('connected')
	})
}

function subscribeToChannel() {
	chat = ws.subscribe('chat:8812')

	chat.on('error', ()=> {
		// alert('will resume in a minute');
	})

	chat.on('message', (message)=>{
		console.log('[WebSocket] MESSAGE: '+ JSON.stringify(message));
		if(message['array_of_value']){
			let array = message.array_of_value;
			for (let index = 0; index < array.length; index++) {
				let id = index+1;
				if(array[index] == 'x' || array[index] == 'o'){
					$("#button_"+id).addClass('disabled');
				} else {
					$("#button_"+id).removeClass('disabled');
				}
				if(message['nextplayer'] != (window.type == 'player_1'? 'x': 'o')){
					$("#button_"+id).addClass('disabled');
				}
				$('#button_'+id).text(array[index]);
				if(!(window.type == 'player_1' || window.type == 'player_2')){
					$("#button_"+id).removeClass('disabled');
				}
			}
		}
		let win_array = [
			[0,1,2],
			[3,4,5],
			[6,7,8],
			[0,3,6],
			[1,3,7],
			[2,5,8],
			[0,4,8],
			[2,4,6]
		]
		for(let win_object of win_array){
			let array = message.array_of_value;
			if(array[win_object[0]] == array[win_object[1]] && array[win_object[0]] == array[win_object[2]]) {
				alert((array[win_object[0]] == 'x'? 'player 1': 'player 2')+' win!!, Game End');
				let winner = (array[win_object[0]] == 'x'? 'player 1': 'player 2');
				$.ajax({url:'/finishRoom/'+window.room_id})
				for (let index = 1; index <= 9; index++) {
					$("#button_"+index).addClass('disabled');
				}
				let alert_message = winner+' win!!, Game End, \n Do you want to play one more time?'
				if (confirm(alert_message)) {
					// /newRm?username=admin
					window.location.replace('/newRm?username='+window.username)
				  } else {
					// /?username=admin
					window.location.replace('/?username='+window.username)
				  }
			}
		}
	})
}


$('button').on('click', function(){
	var name=$(this).attr('name')
	console.log(name)
	let array = [
		'button_1',
		'button_2',
		'button_3',
		'button_4',
		'button_5',
		'button_6',
		'button_7',
		'button_8',
		'button_9',
	]
	var array_of_value = []
	for(let object of array) {
		array_of_value.push($('#'+object).text())
	}
	ws.getSubscription('chat:8812').emit('message', {
		username: window.username,
		room_id: window.room_id,
		body: name,
		type_of_shape: (window.type == 'player_1'? 'x': 'o'),
		array_of_value: array_of_value,
		type: "gamer"
	})
})


