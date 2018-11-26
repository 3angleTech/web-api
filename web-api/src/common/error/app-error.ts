/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webFrame/LICENSE
 */

export interface ErrorParameters {
  message: string;
  httpStatusCode: number;
  stack?: string;
  name?: string;
}

export class AppError extends Error {
  public httpStatusCode: number;

  constructor(parameters: ErrorParameters) {
    super(parameters.message);
    this.httpStatusCode = parameters.httpStatusCode;
    this.stack = parameters.stack;
    this.name = parameters.name;
  }
}
