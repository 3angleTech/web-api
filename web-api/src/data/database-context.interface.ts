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

export interface IDatabaseContext {
  getModel(model: DatabaseModel): SequelizeModel<any, any>;
}
export const IDatabaseContext = Symbol.for('IDatabaseContext');
