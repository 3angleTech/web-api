/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webFrame/LICENSE
 */
/* tslint:disable:parameters-max-number */

import { NextFunction } from 'express';
import * as HttpStatus from 'http-status-codes';
import { AppRequest, AppResponse } from '../../core';

export function errorMiddleware(err: Error, req: AppRequest, res: AppResponse, next: NextFunction): void {
  const httpStatusCode = (<any>err).httpStatusCode || HttpStatus.INTERNAL_SERVER_ERROR;
  res.status(httpStatusCode)
    .json({
      name: err.name,
      message: err.message,
      stack: err.stack,
    });
}
