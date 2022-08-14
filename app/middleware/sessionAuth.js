function verifySession(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).send('Unauthorized');
  }

  return next();
}

module.exports = verifySession;
