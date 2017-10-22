/**
 * PackageController
 *
 * @description :: Server-side logic for managing packages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	  //TODO: package controller
  //test package view
  packages: function(req, res){
    var tmp = {


    };
    res.view('packages', { data: tmp });
  },

  package: function(req, res){
    res.view('package');
  }
};

