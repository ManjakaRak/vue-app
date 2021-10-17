const jwt = require('jsonwebtoken')
const JWT_SIGN_SECRET = '345kljfd9gj598jg5894dkla9falk093781kf1j3jjk358yzvvklml'
module.exports = {
  // generate token
  generateTokenForAdmin: function (data) {
    return jwt.sign({
      // payload
      userId: data._id
    },
    JWT_SIGN_SECRET,
    {
      expiresIn: '24h'
    })
  },
  // parse token
  parseToken: function (auth) {
    return (auth != null)? auth.replace('Bearer ', ''): null
  },
  // get the Id
  getUserId: function (auth) {
    const token = this.parseToken(auth)
    if (token) {
      try {
        return jwt.verify(token, JWT_SIGN_SECRET).userId
      } catch (error) {return 'Invalid Token'}
    } else {
      return {error: 'Token not exist'}
    }
  }
}