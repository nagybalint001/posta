/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {

  if ((typeof req.session.user !== 'undefined')) {
    return next();
  }

  return res.redirect('/login?_redir=' + encodeURIComponent(req.url));
};
