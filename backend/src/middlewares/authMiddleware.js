const jwt = require('jsonwebtoken');

module.exports = (request, response, next) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.sendStatus(401);
  }

  try {
    const token = authorization.replace('Bearer', '').trim();
    const data = jwt.verify(token, process.env.SECRET);

    request.userId = data.id;

    next();
  } catch (err) {
    return response.sendStatus(401);
  }
};
