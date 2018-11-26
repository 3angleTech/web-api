/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

import { DataTypes as SequelizeDataTypes, Sequelize } from 'sequelize';

module.exports = (sequelize: Sequelize, DataTypes: SequelizeDataTypes) => {
  const users = sequelize.define('Users', {
    username: { type: DataTypes.STRING, field: 'username' },
    password: { type: DataTypes.STRING, field: 'password' },
    email: { type: DataTypes.STRING, field: 'email' },
    firstName: { type: DataTypes.STRING, field: 'first_name' },
    lastName: { type: DataTypes.STRING, field: 'last_name' },
    createdBy: { type: DataTypes.INTEGER, field: 'created_by' },
    updatedBy: { type: DataTypes.INTEGER, field: 'updated_by' },
    createdAt: { type: DataTypes.DATE, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, field: 'updated_at' },
  }, {
      tableName: 'users',
      underscored: true,
    });
  users.associate = (models) => {
    // associations can be defined here
  };
  return users;
};
