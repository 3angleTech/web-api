/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webFrame/LICENSE
 */

import { Model as SequelizeModel } from 'sequelize';

/**
 * Available SQL Models (tables).
 */
export enum SqlModel {
  Users,
}

export interface ISqlContext {
  getModel(model: SqlModel): SequelizeModel<any, any>;
}
export const ISqlContext = Symbol.for('ISqlContext');
