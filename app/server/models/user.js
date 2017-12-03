'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    messenger_id: DataTypes.STRING,
    name: DataTypes.STRING,
    fb_first_name: DataTypes.STRING,
    fb_last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    gender: DataTypes.STRING,
    fb_profile_pic: DataTypes.STRING,
    cellphone: DataTypes.STRING,
    city: DataTypes.STRING,
    district: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return user;
};