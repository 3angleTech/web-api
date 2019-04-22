/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

import { isNil } from '../utils';
import { ILogger, LogLevel } from './logger.interface';

export class Logger implements ILogger {
  private static instance: Logger;

  constructor() { }

  // tslint:disable-next-line:function-name
  public static getInstance(): ILogger {
    if (isNil(Logger.instance)) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public log(level: LogLevel, message: string, ...optionalParams: any[]): void {
    switch (level) {
      case LogLevel.Debug: {
        // tslint:disable-next-line:no-console
        console.debug(message, optionalParams);
        break;
      }
      case LogLevel.Warning: {
        console.warn(message, optionalParams);
        break;
      }
      case LogLevel.Error: {
        console.error(message, optionalParams);
        break;
      }
      default: {
        console.log(message, optionalParams);
        break;
      }
    }
  }
}
