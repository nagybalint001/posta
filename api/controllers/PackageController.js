/**
 * PackageController
 *
 * @description :: Server-side logic for managing packages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  packages: function(req, res){
    if ((typeof req.param('searchId') !== 'undefined') && req.param('searchId') != "") {
      var q = [] 
      var tmp = req.param('searchId').split(" ");
      for(var i = 0; i < tmp.length; i++) {
        q.push( { pid: {'contains': tmp[i] } } )
      }
      // összes olyan csomag megkeresése, aminek a pid-je tartalmazza a megadott pid-ek valamelyikét (szóközzel elválasztva kell megadni)
      Package.find({
        or: q
      }).exec(function (err, packages){
        if (err) {
          //Handle Error
        }
        res.view('packages', { data: packages });
      })
    }
    else{
      Package.find().exec(function (err, packages){
        if (err) {
          //Handle Error
        }
        res.view('packages', { data: packages });
      })
    }
  },

  create: function(req, res) {
    Package.create(req.body).exec(function(err, result){
      if (err) {
        //Handle Error
      }
      return res.redirect('/packages')
    });
  },

  addPackageForm: function(req, res){
    res.view('package');
  },

  modifyPackageForm: function(req, res) {
    return res.redirect('/api/package/' + req.param('id'))
  }
};

