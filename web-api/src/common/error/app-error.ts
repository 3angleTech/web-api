/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

export interface IAppErrorParameters {
  message: string;
  httpStatusCode: number;
  stack?: string;
  name?: string;
}

export class AppError extends Error implements IAppErrorParameters {
  public httpStatusCode: number;

  constructor(parameters: IAppErrorParameters) {
    super(parameters.message);
    this.httpStatusCode = parameters.httpStatusCode;
    this.stack = parameters.stack;
    this.name = parameters.name;
  }
}
