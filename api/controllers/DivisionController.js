module.exports = {
  create: function(req, res){
    Division.create(req.body).exec(function(err, result){
        if (err) {
          return res.serverError()
        }
        return res.redirect('/admin')
      });
  }
};