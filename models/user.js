'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    contact_number: DataTypes.STRING,
    passcode: DataTypes.STRING,
    address: DataTypes.STRING,
    zipcode: DataTypes.INT,
    country: DataTypes.STRING,
    user_status: DataTypes.ENUM,
    account_locked: DataTypes.INT,
    registered_on: DataTypes.INT,
    activation_key: DataTypes.STRING,
    activated_on: DataTypes.INT,
    added_by: DataTypes.STRING,
    updated_by: DataTypes.STRING,
    deleted_by: DataTypes.STRING
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};