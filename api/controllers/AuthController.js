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

  loginForm: function(req, res) {
    res.view('login', {locals: { title: "Login"}})
  },

  login: function(req, res) {
    var { name, password } = req.allParams()
    User.findOne({name}).exec((err, user) => 
      {
        if(err)
          return res.view("login", {error:"Server Error", name, title: "Login"})

        if(!user)
          return res.view("login", {error:"Invalid Login", name, title: "Login"})

        User.checkPassword(user, password, (err, valid) => {
          if(err)
            return res.view("login", {error:"Server Error", name, title: "Login"})
          if(!valid)
            return res.view("login", {error:"Invalid Login", name, title: "Login"})
          
          req.session.login = true;
          return res.redirect("/")
        })
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

