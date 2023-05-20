const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');
const config = require('../config');

module.exports = (req, res, next) => {
  if (!req.cookies) {
    next(new Unauthorized('Не выполнена авторизация'));
    return;
  }

  const token = req.headers.authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, config.JWT_SECRET);
  } catch (err) {
    next(new Unauthorized('Не выполнена авторизация'));
    return;
  }

  req.user = payload;

  next();
};
