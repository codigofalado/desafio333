const jwt = require('jsonwebtoken')
const User = require('./../db/models/user')

const auth = async (request, response, next) => {
  try {
    let token = request.headers.authorization.replace('Bearer ', '')
    let decoded = jwt.verify(token, process.env.JWT_SECRET)
    let userId = decoded._id
    let foundUser = await User.findOne({ _id: userId, 'tokens.token': token })
    if (!foundUser) throw new Error()
    request.user = foundUser
    request.token = token 
    next()
  } catch (error) {
    return response.status(401).send({ error: 'Please authenticate' })
  }
}

module.exports = auth