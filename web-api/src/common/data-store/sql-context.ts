/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webFrame/LICENSE
 */
const models = require('./sql-db/models');

import { Model } from 'sequelize';
import { Logger, LogLevel } from '../logger';
import { ISqlContext, SqlModel } from './sql-context.interface';

export class SqlContext implements ISqlContext {
  constructor() {
    this.initialize();
  }

  private initialize(): void {
    models.sequelize
      .authenticate()
      .then(() => {
        Logger.getInstance().log(LogLevel.Info, 'Connection has been established successfully.');
      })
      .catch(err => {
        Logger.getInstance().log(LogLevel.Error, 'Unable to connect to the database:', err);
      });
  }

  public getModel(model: SqlModel): Model<any, any> {
    return models[model];
  }
}
