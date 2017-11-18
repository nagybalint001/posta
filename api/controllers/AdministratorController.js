module.exports = {
    create: function(req, res){
      Administrator.create(req.body).exec(function(err, result){
          if (err) {
            return res.serverError()
          }
          return res.redirect('/admin')
        });
    }
  };