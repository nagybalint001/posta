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
                
        req.session.user = user
        return res.redirect("/")
      })
    })
  },

  create: function(req, res) {
    User.create(req.body).exec(function(err, result){
      if (err) {
        return res.serverError()
      }
      return res.redirect('/admin')
    });
  },

  update: function(req, res){
    if(typeof req.body == "undefined" 
    || req.body.id != req.session.user.id 
    || req.body.name != req.session.user.name){
      return res.redirect('');
    }
    var userNewData = {};
    if(req.body.fullname && req.body.fullname != '')
      userNewData.fullname = req.body.fullname;
    if(req.body.email && req.body.email != '')
      userNewData.email = req.body.email;
    userNewData.phone = req.body.phone || '';
    User.update({id:req.body.id, name:req.body.name},userNewData, function(err, results){
      if(err){
        console.log("err", err);
        //TODO: session - db consistency?
      }
      if(results){
        //refresh session user
        req.session.user = results[0];
        return res.redirect('/profil');
      }
    });

  },
    
  logout: function(req, res) {
    req.session.destroy(function (err) {
      if(err){
        console.log("logout err: ", err);
      }
			return res.redirect('/');
		});
  }
};

