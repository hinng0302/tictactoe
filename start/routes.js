'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {import('@adonisjs/framework/src/Route/Manager'} */
const Route = use('Route')

Route.get('/', 'LoginController.index')
Route.get('/regist_page', 'LoginController.regist_page')
Route.post('/login', 'LoginController.login')
Route.get('/finishRoom/:room_id', 'LoginController.finishRoom')
Route.post('/ologin', 'LoginController.otherLogin')
Route.post('/register', 'LoginController.newregister')
Route.get('/selectroom', 'RoomSelectController.index')
Route.get('/newRm', 'RoomSelectController.roomCreate')
Route.post('/creatroom', 'RoomSelectController.createroom')
Route.get('/room', 'RoomSelectController.warzone')