/**
 * Package.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    pid: {
      type: 'string'
    },
    creator: {
      type: 'string',
      required: true
    },
    date: {
      type: 'date'
    },
    dir: {
      type: 'string',
      required: true
    },
    administrator: {
      type: 'string'
    },
    division: {
      type: 'string',
      required: true
    },
    type: {
      type: 'string',
      required: true
    },    
    parcelNumber: {
      type: 'string'
    },
    partner: {
      type: 'string',
      required: true
    },
    city: {
      type: 'string'
    },
    zip: {
      type: 'string'
    },
    count: {
      //type: 'integer'
      type: 'string'
    },
    weight: {
      //type: 'integer'
      type: 'string'
    },
    value: {
      //type: 'integer'
      type: 'string'
    },
    weightPrice: {
      //type: 'integer'
      type: 'string'
    },
    total: {
      //type: 'integer'
      type: 'string'
    },
    extraFee: {
      //type: 'integer'
      type: 'string'
    },
    subject: {
      type: 'string',
      required: true
    },
    comment: {
      type: 'string'
    }
  },

  beforeCreate: (package, next) => {
    Package.find({date: package.date}).exec(function (err, packages){
      var pid = package.date.toISOString().replace('-', '/').split('T')[0].replace('-', '/');
      var tmp = "000" + (packages.length + 1);
      pid = pid + "/" + tmp.substr(tmp.length - 3);
      package.pid = pid;
      next();
    });
  }
};

