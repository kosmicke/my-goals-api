const usersController = require('../controllers/users.controller')

const userRoutes = app => {
  app.post('/users/login', usersController.login)
  app.post('/users/register', usersController.register)
}

module.exports = userRoutes
