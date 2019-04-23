const UsersController = require('./UsersController')
const RegisterController = require('./RegisterController')
const EventsController = require('./EventsController')
const LoginController = require('./LoginController')

module.exports = {

  user: UsersController,
  register: RegisterController,
  event: EventsController,
  login: LoginController

}
