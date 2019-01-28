'use strict'

class RmSocketController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }

  onMessage(message) {
    console.log(this.socket)
    console.log('on Message: '+JSON.stringify(message))
    var ret_msg = message
    if(message.type_of_shape =='x'){
      ret_msg.array_of_value[message.body-1] = 'x'
      ret_msg.nextplayer = 'o'
    } else {
      ret_msg.array_of_value[message.body-1] = 'o'
      ret_msg.nextplayer = 'x'
    }
		this.socket.broadcastToAll('message', ret_msg)
	}
}

module.exports = RmSocketController
