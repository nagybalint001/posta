module.exports = function(req, res, next) {
  if ((typeof req.session.user !== 'undefined') ? req.session.user.is_admin : false) {
    return next();
  }    
  return res.redirect('/')
};