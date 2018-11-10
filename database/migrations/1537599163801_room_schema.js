'use strict'

const Schema = use('Schema')

class RoomSchema extends Schema {
  up () {
    this.create('rooms', (table) => {
      table.increments('room_id')
      table.integer('player_1')
      table.integer('player_2')
      table.integer('winner_id')
      table.enum('room_status', ['waiting', 'battle', 'finish'])
      table.timestamps()
    })
  }

  down () {
    this.drop('rooms')
  }
}

module.exports = RoomSchema
