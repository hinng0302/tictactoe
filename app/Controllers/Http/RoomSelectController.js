'use strict'

class RoomSelectController {
    async index({session, response}){
        if(session.get('logined') == 'false'){
            response.redirect('/')
        } else {
            let username = session.get('username')
            response.redirect('/?username='+username)
        }
    }

    async roomCreate({params, view}){
        return view.render('CreateRoom', {title: 'Create Room'})
    }

    async createroom({request, response}){
        let post_value = request.post()
        console.log(post_value)
        const Room = use('App/Models/Room')
        const USER = use('App/Models/User')
        let user = await USER.query().where('username', post_value.username).first()
        user = user.toJSON()
        console.log(user)
        let room = new Room()
        room.player_1 = user.id
        room.room_name = post_value.Room_Name
        room.room_status = 'waiting'
        await room.save()
        let room_id = room.id
        response.redirect('/room?room_id='+room_id+'&username='+post_value.username)
    }

    async warzone({request, view}){
        const getRequest = request.get()
        console.log(getRequest)
        let room_id = getRequest.room_id
        let username = getRequest.username
        let type = getRequest.type
        if(type == 'player_2'){
            const Room = use('App/Models/Room')
            const USER = use('App/Models/User')
            let user = await USER.query().where('username', username).first()
            let user_id = user.id
            let room = await Room.query().where('room_id', room_id).first()
            room.player_2 = user_id
            
            await room.save()
        }
        return view.render('warzone', getRequest)
    }
}

module.exports = RoomSelectController
