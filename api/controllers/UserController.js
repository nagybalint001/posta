/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  profil: function(req, res) {
    res.view('profil', { title: "Profil"})
  },

  loginForm: function(req, res) {
    res.view('login', { title: "Login"})
  },
    
  admin: function(req, res) {
    res.view('admin', { title: "Admin"})
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
                
        req.session.login = true
        req.session.user = user
        return res.redirect("/")
      })
    })
  },

  create: function(req, res) {
    User.create(req.body).exec(function(err, result){
      if (err) {
        //Handle Error
      }
      return res.redirect('/admin')
    });
  },
    
  logout: function(req, res) {
    req.session.login = false;
    //req.session.destory();
    res.redirect("/")
  }
};

