/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webFrame/LICENSE
 */

import { NextFunction } from 'express';
import { AppRequest, AppResponse } from '../../../core';

export interface IHealthCheckController {
  run(req: AppRequest, res: AppResponse, next: NextFunction): void;
}
export const IHealthCheckController = Symbol.for('IHealthCheckController');
