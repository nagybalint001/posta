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
          return res.serverError()
        }
        res.view('packages', { data: packages });
      })
    }
    else{      
      var q = { };

      if(req.param('pid', '') != ""){
        q.pid = { 'contains' : req.param('pid')}
      }
      if(req.param('creator', '') != ""){
        q.creator = { 'contains' : req.param('creator')}
      }
      if(req.param('dir', '') != ""){
        q.dir = { 'contains' : req.param('dir')}
      }
      if(req.param('administrator', '') != ""){
        q.administrator = { 'contains' : req.param('administrator')}
      }
      if(req.param('division', '') != ""){
        q.division = { 'contains' : req.param('division')}
      }
      if(req.param('type', '') != ""){
        q.type = { 'contains' : req.param('type')}
      }
      if(req.param('parcelNumber', '') != ""){
        q.parcelNumber = { 'contains' : req.param('parcelNumber')}
      }
      if(req.param('partner', '') != ""){
        q.partner = { 'contains' : req.param('partner')}
      }
      if(req.param('city', '') != ""){
        q.city = { 'contains' : req.param('city')}
      }
      if(req.param('zip', '') != ""){
        q.zip = { 'contains' : req.param('zip')}
      }
      if(req.param('subject', '') != ""){
        q.subject = { 'contains' : req.param('subject')}
      }
      if(req.param('comment', '') != ""){
        q.comment = { 'contains' : req.param('comment')}
      }
      if(req.param('from', '') != "" && req.param('to', '') != ""){
        q.date = { '>=' : req.param('from'), '<=' : req.param('to')}
      } 
      else if(req.param('from', '') != ""){
        q.date = { '>=' : req.param('from')}
      } 
      else if(req.param('to', '') != ""){
        q.date = { '<=' : req.param('to')}
      }

      Package.find(q).exec(function (err, packages){
        if (err) {
          return res.serverError()
        }
        res.view('packages', { data: packages });
      })
    }
  },

  create: function(req, res) {
    Package.create(req.body).exec(function(err, result){
      if (err) {
        return res.serverError()
      }
      return res.redirect('/packages')
    });
  },

  update: function(req, res) {
    var params = req.body;
    delete params.creator;
    Package.update({ id: req.param('id') }, req.body).exec(function(err, result){
      if (err) {
        return res.serverError()
      }
      return res.redirect('/packages');
    });
  },

  addPackageForm: function(req, res){
    res.view('package');
  },

  modifyPackageForm: function(req, res) {
    Package.findOne({id: req.param('id')}).exec(function (err, record){
      if (err) {
        return res.serverError()    
      }
      else if (!record){
        return res.notFound() 
      }

      res.view('packageEdit', { package: record })      
    });
  }
};

