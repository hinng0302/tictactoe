'use strict'

class RmSocketController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }
  onMessage(message) {
    console.log('on Message'+JSON.stringify(message))
		this.socket.broadcastToAll('message', message)
	}
}

module.exports = RmSocketController
