module.exports = function(req, res, next) {
  if ((typeof req.session.user !== 'undefined') && req.session.user.is_admin) {
    return next();
  }    
  return res.redirect('/')
};