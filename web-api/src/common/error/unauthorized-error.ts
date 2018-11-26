/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webFrame/LICENSE
 */

import * as HttpStatus from 'http-status-codes';
import { AppError, ErrorParameters } from './app-error';

export class UnauthorizedError extends AppError {
  constructor(options: ErrorParameters) {
    options.httpStatusCode = HttpStatus.UNAUTHORIZED;
    super(options);
  }
}
