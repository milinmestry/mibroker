'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    first_name: {
      type: DataTypes.STRING(25),
      allowNull: false, // SequelizeValidationError: notNull Violation: user.first_name cannot be null
      validate: {
        notEmpty: true,
        is: ['^[a-z]+$', 'i'],
        len: [1, 25],
      },

      set(name) {
        this.setDataValue('first_name', name);
      },

      get() {
        return this.getDataValue('first_name');
      },
    },
    last_name: {
      type: DataTypes.STRING(25),
      allowNull: true,
      validate: {
        notEmpty: false,
        is: ['^[a-z]+$', 'i'],
        len: [0, 25],
      },

      set(name) {
        this.setDataValue('last_name', name);
      },

      get() {
        return this.getDataValue('last_name');
      },
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true,
        len: [1, 150],
      },

      set(email) {
        this.setDataValue('email', email);
      },

      get() {
        return this.getDataValue('email');
      },
    },
    contact_number: {
      type: DataTypes.STRING(40),
      allowNull: true,
      validate: {
        notEmpty: false,
        len: [1, 40],
      },

      set(contact_number) {
        this.setDataValue('contact_number', contact_number);
      },

      get() {
        return this.getDataValue('contact_number');
      },
    },
    passcode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },

      set(passcode) {
        this.setDataValue('passcode', passcode);
      },

      get() {
        return this.getDataValue('passcode');
      },
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate: {
        notEmpty: true,
        is: ['^[a-z0-9\-\.,\s]+$', 'i'],
        len: [1, 255],
      },

      set(address) {
        this.setDataValue('address', address);
      },

      get() {
        return this.getDataValue('address');
      },
    },
    zipcode: {
      type: DataTypes.STRING(20),
      allowNull: true,
      validate: {
        notEmpty: true,
        isAlphanumeric: true,
        len: [3, 20],
      },

      set(zipcode) {
        this.setDataValue('zipcode', zipcode);
      },

      get() {
        return this.getDataValue('zipcode');
      },
    },
    country: {
      type: DataTypes.STRING(60),
      allowNull: true,
      validate: {
        notEmpty: true,
        len: [1, 30],
      },

      set(country) {
        this.setDataValue('country', country);
      },

      get() {
        return this.getDataValue('country');
      },
    },
    user_status: {
      type: DataTypes.ENUM('active', 'inactive', 'registered', 'suspended'),
      allowNull: true,
      defaultValue: 'inactive',
      validate: {
        notEmpty: true,
        isIn: [['active', 'inactive', 'registered', 'suspended']],
      },

      set(user_status) {
        this.setDataValue('user_status', user_status);
      },

      get() {
        return this.getDataValue('user_status');
      },
    },
    account_locked: {
      type: DataTypes.ENUM('no', 'yes'),
      allowNull: true,
      validate: {
        notEmpty: true,
        isIn: [['no', 'yes']],
      },

      set(account_locked) {
        this.setDataValue('account_locked', account_locked);
      },

      get() {
        return this.getDataValue('account_locked');
      },
    },
    registered_on: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      validate: {
      },

      set(registeredOn) {
        this.setDataValue('registered_on', registeredOn);
      },

      get() {
        return this.getDataValue('registered_on');
      },
    },
    activation_key: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true,
      },

      set(activation_key) {
        this.setDataValue('activation_key', activation_key);
      },

      get() {
        return this.getDataValue('activation_key');
      },
    },
    activated_on: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      validate: {
      },

      set(activated_on) {
        this.setDataValue('activated_on', activated_on);
      },

      get() {
        return this.getDataValue('activated_on');
      },
    },
    added_by: DataTypes.STRING(100),
    updated_by: DataTypes.STRING(100),
    deleted_by: DataTypes.STRING(100),
  },
  {
    timestamps: true,
    paranoid: false,
    underscored: true,

    // I want to rename to be called with another name
    // createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',

    charset: 'utf8',
    collate: 'utf8_unicode_ci',
  },
  {
    underscored: true,
    classMethods: {
      associate: function (models) {
        // associations can be defined here
      },
    },
  });
  return User;
};
