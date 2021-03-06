var json2csv = require('json2csv');

/**
 * PackageController
 *
 * @description :: Server-side logic for managing packages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  packages: function(req, res){
    var q;
    if (req.param('search', '') != "") {
      /**
       * Gyors keresés:
       * összes olyan csomag megkeresése, 
       * aminek a (pid/partner/subject)-je tartalmazza a megadott 
       * pid-ek valamelyikét (szóközzel elválasztva kell megadni)
       */
      q = [];
      //explode query
      var tmp = req.param('search').split(" ");
      for(var i = 0; i < tmp.length; i++) {
        if(tmp[i] == "")
          continue;
        q.push( { pid: {'contains': tmp[i] } } );
      }
      q.push( { partner: {'contains': req.param('search') } } );
      q.push( { subject: {'contains': req.param('search') } } );

      q = {or : q};
    }
    else{     
      /**
       * Részletes :) lekérdezés
       */ 
      q = { };
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
    }
    /**
     * Lekérdezés
     */
    var page = +req.param('page') || 1 ;
    // create query for page links
    var baseparams = req.allParams();
      delete baseparams.page;
      basequery = "?";
      for(key in baseparams){
        basequery += key + "=" + baseparams[key] + "&";
      }
    var pagelimit = 5;
    Package
    .find(q)
    .paginate({page, limit: pagelimit})
    .exec(function (err, packages){
      if (err) {
        return res.serverError()
      }
      var _export = req.param('export');
      if(_export && _export == 'csv'){
        // export - csv format 
        if(Object.keys(packages).length === 0)//check packages - empty 
          packages = {empty:'empty'};
        var csvdata = json2csv({data:packages});
        res.attachment('export.csv');//download
        res.end(csvdata, 'utf-8');
      }
      else{
        Package.count(q).exec(function(err, count){
          if (err) { return console.log(err); }
          var maxpage = Math.ceil(count/pagelimit);
          // render view
          Administrator.find().exec(function (err, administrators) {
            Division.find().exec(function(err2, divisions) {
              res.view('packages', { data: packages, page, maxpage, basequery, administrators, divisions});
            })
          })
        })
      }
    })
  },

  create: function(req, res) {
    /*IF invalid date THEN date.now*/
    if(new Date(req.body.date) == "Invalid Date")
      req.body.date = new Date().toISOString();
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
    
    Administrator.find().exec(function (err, administrators) {
      Division.find().exec(function(err2, divisions) {
        res.view('package', {administrators, divisions } );
      })
    })
  },

  modifyPackageForm: function(req, res) {
    Package.findOne({id: req.param('id')}).exec(function (err, record){
      if (err) {
        return res.serverError()    
      }
      else if (!record){
        return res.notFound() 
      }
      Administrator.find().exec(function (err, administrators) {
        Division.find().exec(function(err2, divisions) {
          res.view('packageEdit', { package: record, administrators, divisions })  
        })
      })     
    });
  }
};

