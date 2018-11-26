/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webFrame/LICENSE
 */

/**
 * This file has been generated automatically by sequelize, so it should not be changed.
 */
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
import * as Sequelize from 'sequelize';
const dbConfig = require(__dirname + '/../config.js');
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
const db: any = {};

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
