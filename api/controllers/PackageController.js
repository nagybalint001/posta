/**
 * PackageController
 *
 * @description :: Server-side logic for managing packages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  packages: function(req, res){
    Package.find().exec(function (err, packages){
      if (err) {
        //Handle Error
      }
      res.view('packages', { data: packages });
      //return res.json(packages);
    })    
  },

  create: function(req, res) {
    Package.create(req.body).exec(function(err, result){
      if (err) {
        //Handle Error
      }
      return res.redirect('/packages')
    });
  },

  package: function(req, res){
    res.view('package');
  }
};

