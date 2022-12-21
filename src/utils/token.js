const jwt = require('jsonwebtoken')
const JWT_SECRET = 'P!CkF00d2019'
const JWT_EXPIRATION = 86400 //24 hours;

const buildToken = payload => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION
  })
}

const verifyToken = async token => {
  if (!token) {
    throw new Error("Authorization token wasn't sent")
  }

  const tokenParts = token.split(' ')
  const tokenType = tokenParts[0]
  const tokenValue = tokenParts[1]

  if (!tokenType || !tokenValue || tokenType.toLowerCase() !== 'bearer') {
    throw new Error('Sent authorization token format is invalid')
  }

  return await jwt.verify(tokenValue, JWT_SECRET, null)
}

module.exports = {
  buildToken,
  verifyToken
}
