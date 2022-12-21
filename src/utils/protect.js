const tokenUtil = require('../utils/token')

const protect = async (req, res, next) => {
  const token = req.headers.authorization || req.headers.Authorization

  tokenUtil
    .verifyToken(token)
    .then(user => {
      req.user = user
      next()
    })
    .catch(error => {
      res
        .status(401)
        .json({ error: error.message, message: 'Erro na autenticação.' })
    })
}

module.exports = protect
