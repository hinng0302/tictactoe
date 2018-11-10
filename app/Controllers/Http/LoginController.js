'use strict'
const User = use('App/Models/User')
class LoginController {
    async index({request, view, response}){
        const ROOM = use('App/Models/Room')
        let rm = await ROOM.query().with('playOneName').with('playTwoName').whereIn('room_status', ['waiting', 'battle']).fetch()
        rm = rm.toJSON()
        console.log(rm)
        return view.render('welcome', {title:'welcome', rm_lists: rm})// , {room_lists: rm})
    }
    async regist_page({view}){
        return view.render('newregister')//, { "title":'New Register' })
    }
    async login({request, session, response}){
        var {username, password} = request.all(['username', 'password'])
        try{
            var user = await User.query().where('username', username).whereRaw('password=md5(?)', [password]).first()
            user = user.toJSON()
            console.log(user)
            if(user){
                console.log('success')
                await session.put('username', username)
                await session.put('logined', 'true')
                response.redirect('/selectroom')
            } else {
                response.status(403).json({error: 'Username/Password error'})
            }

        }catch(error){
            console.log(error)
            response.status(403).json({error: 'Username/Password error'})
        }
    }

    async otherLogin({request, response}){
        const got = use('got')
        const Env = use('Env')
        let url = Env.get('APP_URL')+'/login'
        const body = request.post()
        console.log(body)
        let {username, password} = request.only(['username', 'password'])
        let options = {
            method: 'post',
            header: {
                'Content-Type': 'application/json'
            },
            data: {
                "username": username,
                "password": password,
                "_csrf": request.csrfToken
            }
        }
        console.log(options)
        var result = await got(url, options)
        response.json(result.body)
    }

    async newregister({request, response}){
        var {username, email, password_1, password_2}= request.all(['username', 'email', 'password_1', 'password_2'])
        if(password_1 == password_2){
            var user = await User.query().where('username',username).fetch()
            user = user.toJSON()
            if(user.length == 0){
                var database = use('Database')
                await database.raw('insert into users(username, email, password) values(?, ?, md5(?))', [username, email, password_1])
                response.redirect('/?newregist=true')
            } else {
                response.header('Cache-Controller', 'no-store, no-cache').json({
                    error: 'username has already used'
                })
            }
        } else {
            response.header('Cache-Controller', 'no-store, no-cache').json({
                error: 'Password is not correct'
            })
        }
    }
}

module.exports = LoginController
