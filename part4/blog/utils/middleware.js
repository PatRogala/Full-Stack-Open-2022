const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')

  if (authorization) {
    request.token = authorization.replace('Bearer ', '')
  }

  next()
}

module.exports = {
  tokenExtractor
}