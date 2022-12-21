const usersRoutes = require('./users.routes')

const routes = app => {
  usersRoutes(app)
}

module.exports = routes
