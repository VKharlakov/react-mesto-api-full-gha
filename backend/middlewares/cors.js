const allowedCors = [
  'localhost:3000',
  'https://praktikum.tk',
  'http://praktikum.tk',
  'https://mesto.students.vkharlakov.nomoredomains.monster',
  'http://mesto.students.vkharlakov.nomoredomains.monster',
  'https://api.mesto.vkharlakod.nomoredomains.monster',
  'http://api.mesto.vkharlakod.nomoredomains.monster',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
};
