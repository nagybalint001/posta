/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  _config: {
    actions: false,
    shortcuts: false,
    rest: false
  },  
    
  islogin: function(req, res) {
    res.render("display", {value:req.session.login})
  },

  auth: function(req, res) {
    if(req.session.login)
      res.view('main')
    else
      res.redirect('/login')
  },

};

