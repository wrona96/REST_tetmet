const UsersController = require('./UsersController')
const EventsController = require('./EventsController')
const CommentsController = require('./CommentsController')

module.exports = {

  user: UsersController,
  event: EventsController,
  comment: CommentsController

}
