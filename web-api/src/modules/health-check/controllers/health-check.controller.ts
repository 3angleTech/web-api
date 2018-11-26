/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webFrame/LICENSE
 */

import { NextFunction } from 'express';
import { injectable } from 'inversify';
import { AppRequest, AppResponse } from '../../../core';
import { IHealthCheckController } from './health-check.controller.interface';

@injectable()
export class HealthCheckController implements IHealthCheckController {

  constructor(
  ) {
    this.run = this.run.bind(this);
  }

  public run(req: AppRequest, res: AppResponse, next: NextFunction): void {
    // TODO: check db connection etc
    res.json({
      status: 'Running',
    });
  }

}
