/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

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
    user.password = "hashed pass"
    next()
  }
};

