/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
const bcrypt = require('bcryptjs')

module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true,
      unique: true
    },
    fullname: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string'
    },
    phone: {
      type: 'string'
    },
    password: {
      type: 'string',
      required: true
    },
    is_admin: {
      type: 'boolean',
      required: true,
      defaultsTo: false
    }
  },

  customToJSON() {
    var user = this.toObject()
    delete user.password
    return user
  },

  beforeCreate: (user, next) => {
    bcrypt.hash(user.password, 10, function (err, hash) {
      user.password = hash;
      next();
    });
  },

  beforeUpdate: (user, next) =>{
    if(user.newpassword){
      bcrypt.hash(user.newpassword, 10, function (err, hash) {
        user.password = hash;
        delete user.newpassword;
        next();
      });
    }
    else{
      next();
    }
  },

  checkPassword: (user, pass, next) => {
    bcrypt.compare(pass, user.password, (err, res) => {
      if (err)
        next(err, false)

      if (res)
        next(null, true)
      else
        next(err, false)
    })
  }
};

