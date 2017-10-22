/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 //TODO: rename AuthController -> MainController ?!
module.exports = {

  _config: {
    actions: false,
    shortcuts: false,
    rest: false
  },  
  
  islogin: function(req, res) {
    var _islogin = req.session.login || false;
    res.render("display", {value:_islogin})
  },

  main: function(req, res) {
      res.view('main');
  },
};

