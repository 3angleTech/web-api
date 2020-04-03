/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */
import { ErrorRequestHandler, NextFunction } from 'express';
import * as HttpStatus from 'http-status-codes';
import { AppRequest, AppResponse } from '../../core';
import { Logger, LogLevel } from '../logger';
import { AppError } from './app-error';

// tslint:disable-next-line:parameters-max-number
export async function errorMiddleware(
  err: AppError | Error | string,
  req: AppRequest,
  res: AppResponse,
  next: NextFunction,
): Promise<void> {
  if (typeof err === 'string') {
    // tslint:disable-next-line:no-parameter-reassignment
    err = new Error(`${err}`);
  }
  const httpStatusCode: number = (err as AppError).httpStatusCode || HttpStatus.INTERNAL_SERVER_ERROR;
  if (httpStatusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
    Logger.getInstance().log(LogLevel.Error, 'Runtime Error', err);
  }
  res.status(httpStatusCode).json({
    name: err.name,
    message: err.message,
  });

  return;
}
