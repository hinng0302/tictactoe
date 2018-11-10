'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RoomSchema extends Schema {
  up () {
    this.table('rooms', (table) => {
      // alter table
      table.string('room_name').after('player_2')
      table.dropColumn('winner_id')
    })
  }

  down () {
    this.table('rooms', (table) => {
      // reverse alternations
    })
  }
}

module.exports = RoomSchema
