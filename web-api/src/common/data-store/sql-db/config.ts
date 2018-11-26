/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webFrame/LICENSE
 */

import * as config from 'config';

interface DatabaseConfiguration {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  dialect: string;
}

const dbConnection = config.get<DatabaseConfiguration>('db-connection');
export const dbConfiguration = {
  username: dbConnection.username,
  password: dbConnection.password,
  database: dbConnection.database,
  host: dbConnection.host,
  port: dbConnection.port,
  dialect: dbConnection.dialect,
  migrationStorage: 'sequelize',
  migrationStorageTableName: 'sequelize_meta',
  seederStorage: 'sequelize',
  seederStorageTableName: 'data_meta',
  operatorsAliases: false,
  logging: console.log,
};

module.exports = dbConfiguration;
