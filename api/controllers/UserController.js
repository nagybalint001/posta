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

  users: function(req, res){
    /**
     * Lekérdezés
     */
    var page = +req.param('page') || 1 ;
    // create query for page links
    var basequery = "?";
    var pagelimit = 5;
    User
    .find()
    .paginate({page, limit: pagelimit})
    .exec(function (err, users){
      if (err) {
        return res.serverError()
      }
      User.count().exec(function(err, count){
        if (err) { return console.log(err); }
        var maxpage = Math.ceil(count/pagelimit);
        // render view
        res.view('users', { data: users, page, maxpage, basequery});
      })
    })
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
    var renderForm = function(info){
      res.view('profil', { title: "Profil", info})
    }
    if(typeof req.body == "undefined" 
    || req.body.id != req.session.user.id 
    || req.body.name != req.session.user.name){
      return renderform("Invalid user!")
    }
    
    var userNewData = {};

    if(req.body.fullname && req.body.fullname != '')
      userNewData.fullname = req.body.fullname;

    userNewData.email = req.body.email || '';
    userNewData.phone = req.body.phone || '';


    var updateUser = function (newdata) {
      User.update({ id: req.body.id, name: req.body.name }, newdata, function (err, results) {
        if (err) {
          console.log("err", err);
          //TODO: session - db consistency?
        }
        if (results) {
          //refresh session user
          req.session.user = results[0];
          return renderForm("alles OK");
        }
      });
    }
    if(req.body.newpassword !== req.body.newpassword2)
		return renderForm("passwords must match")
	else if(req.body.oldpassword)
      User.findOne({id: req.body.id}).exec((err, user) =>
      {
        if(!user || err)
          return console.log("error");
	    User.checkPassword(user, req.body.oldpassword, (err, valid) =>
        {
          if(!valid )
            return renderForm("password incorect");
          else if(!req.body.newpassword)
            return renderForm("enter password");
          else
            userNewData.newpassword = req.body.newpassword;
          return updateUser(userNewData);
        })
      })
	else
      return updateUser(userNewData);

    // TODO fix stupid structure of code
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

