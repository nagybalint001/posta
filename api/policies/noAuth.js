module.exports = function(req, res, next) {
  if (req.session.login) {
  	return res.redirect('/')
  }
  return next()
};
