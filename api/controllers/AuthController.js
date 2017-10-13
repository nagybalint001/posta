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

  login: function(req, res) {
    var { name, password } = req.allParams()
    User.findOne({name, password}).exec((err, user) => 
      {
        if(err)
          return res.render("login", {error:"Server Error", name})

        if(!user)
          return res.render("login", {error:"Invalid Login", name})

        req.session.login = true;
        return res.redirect("/")
      })
  },

  logout: function(req, res) {
    req.session.login = false;
//	req.session.destory();
    res.render("display", {value:"logged out"})
  },

  islogin: function(req, res) {
    res.render("display", {value:req.session.login})
  }
};

