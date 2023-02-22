const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')

  if (authorization) {
    request.token = authorization.replace('Bearer ', '')
  }

  next()
}

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)

  request.user = user

  next()
}

module.exports = {
  tokenExtractor,
  userExtractor
}