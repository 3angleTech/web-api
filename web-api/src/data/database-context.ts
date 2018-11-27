/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */
const models = require('./sql-db/models');

import { injectable } from 'inversify';
import { Model } from 'sequelize';
import { Logger, LogLevel } from '../common/logger';
import { DatabaseModel, IDatabaseContext } from './database-context.interface';

@injectable()
export class DatabaseContext implements IDatabaseContext {
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

  public getModel(model: DatabaseModel): Model<any, any> {
    return models[model];
  }
}
