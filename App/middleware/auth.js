const jwt = require('jsonwebtoken');
const config = require('../config/db.config');

module.exports = (req, res, next) => {
  // Get token from header
  // const token = req.header('x-auth-token');
  const cookie = req.cookies;
  // Check if not token
  if (!cookie['x-auth-token']) {
    // return res.status(401).json({
    //   msg: 'No token, authorization denied',
    // });
    console.log('cookie: ' + JSON.stringify(cookie));
    console.log('token: ' + cookie['x-auth-token']);
    return res.redirect('/login');
  }

  // Verify token
  try {
    const decoded = jwt.verify(cookie['x-auth-token'], 'yachoabonent');
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};