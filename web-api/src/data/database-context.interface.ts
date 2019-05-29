/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

import { Model as SequelizeModel } from 'sequelize';

/**
 * Available Database Models (tables).
 */
export enum DatabaseModel {
  Users = 'Users',
}

/**
 * Provides database context to access models.
 */
export interface IDatabaseContext {
  /**
   * Provides the sequelize model for a specific table.
   * @param model The name of the table for the desired sequelize model.
   */
  getModel(model: DatabaseModel): SequelizeModel<any, any>;

  /**
   * Check the DB connection status.
   */
  status(): Promise<boolean>;
}
export const IDatabaseContext = Symbol.for('IDatabaseContext');
