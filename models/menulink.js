'use strict';
module.exports = (sequelize, DataTypes) => {
  const MenuLink = sequelize.define('menulink', {
    menu_position: {
      type: DataTypes.STRING(20),
      set(menu_position) {
        this.setDataValue(menu_position);
      },

      get() {
        return this.getDataValue('menu_position');
      },
    },
    label: {
      type: DataTypes.STRING(30),
      unique: true,
      set(label) {
        this.setDataValue(label);
      },

      get() {
        return this.getDataValue('label');
      },
    },
    slug: {
      type: DataTypes.STRING,
      set(slug) {
        this.setDataValue(slug);
      },

      get() {
        return this.getDataValue('slug');
      },
    },
    menu_title: DataTypes.STRING(100),
    is_external: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      set(menu_title) {
        this.setDataValue(menu_title);
      },

      get() {
        return this.getDataValue('menu_title');
      },
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      set(is_active) {
        this.setDataValue(is_active);
      },

      get() {
        return this.getDataValue('is_active');
      },
    },
    created_by: DataTypes.STRING(100),
    updated_by: DataTypes.STRING(100),
    deleted_by: DataTypes.STRING(100),
  },
  {
    timestamps: true,
    paranoid: false,
    underscored: true,

    // I want updatedAt to actually be called another name
    createdAt: 'created_at',
    updatedAt: 'updated_at',

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
  return MenuLink;
};
