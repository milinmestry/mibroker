'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('category', {
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,

      set(name) {
        this.setDataValue(name);
      },

      get() {
        return this.getDataValue('name');
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,

      set(description) {
        this.setDataValue(description);
      },

      get() {
        return this.getDataValue('description');
      },
    },
    sort: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
      defaultValue: 0,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,

      set(active) {
        this.setDataValue(active);
      },

      get() {
        return this.getDataValue('is_active');
      },
    },
    created_at: {
      // field: 'created_at',
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP()'),
    },
    created_by: DataTypes.STRING(100),
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
    classMethods: {
      associate: function (models) {
        // associations can be defined here
      },
    },
  });
  return Category;
};
