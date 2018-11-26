/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webFrame/LICENSE
 */

import { Request } from 'express';
import { AppContext } from './app-context';

export interface AppRequest extends Request {
  getAppContext: () => AppContext;
}
