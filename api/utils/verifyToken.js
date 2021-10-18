const jwt = require('jsonwebtoken')
const JWT_SIGN_SECRET = 'it5alooo000ngS1gNs3cr3tttf0SingM1111ToK3NnN'

module.exports = function (req, res, next) {
  const token = req.headers['authorization']
  if (!token) {
    res.status(401).send({message: 'Token not found'})
  } else {
    try {
      const tokenVerified = jwt.verify(token, JWT_SIGN_SECRET)
      req.user = tokenVerified
      next()
    } catch (error) { res.status(400).json({message: 'Token invalid'}) }
  }
}