'use strict'

const Model = use('Model')

class Room extends Model {
    static get primaryKey(){
        return 'room_id'
    }
    playOneName() {
        return this.hasOne('App/Models/User', 'player_1', 'id')
    }
    playTwoName() {
        return this.hasOne('App/Models/User', 'player_2', 'id')
    }
}

module.exports = Room
