/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

import { Request } from 'express';

import { AppContext } from './app-context';

// tslint:disable-next-line:interface-name
export interface AppRequest extends Request {
  // tslint:disable-next-line:prefer-method-signature
  getAppContext: () => AppContext;
}
