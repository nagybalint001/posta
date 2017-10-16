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
    password: {
      type: 'string',
      required: true
   }
  },

  customToJSON () {
    var user = this.toObject()
    delete user.password
	return user
  },

  beforeCreate: (user, next) => {
	bcrypt.hash(user.password, 10, function(err, hash) {
      user.password = hash
      next()
    });
  },

  checkPassword: (user, pass, next) => {
    bcrypt.compare(pass, user.password, (err, res) => {
      if(err)
		next(err, false)

      if(res)
        next(null, true)
      else
        next(err, false)
    })
  }
};

