/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

import { DataTypes, QueryInterface } from 'sequelize';
import { encrypt } from '../../../common/crypto';

module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: DataTypes) => {
    await queryInterface.bulkInsert('users', [
      {
        username: 'ionut',
        password: encrypt('qW12!@'),
        email: 'ionut@3angle.tech',
        first_name: 'Ionut Cristian',
        last_name: 'Paraschiv',
        created_by: -1,
        updated_by: -1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  down: async (queryInterface: QueryInterface, Sequelize: DataTypes) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
