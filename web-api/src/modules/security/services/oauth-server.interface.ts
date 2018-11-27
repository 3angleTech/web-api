/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

import { Token } from 'oauth2-server';
import { AppRequest, AppResponse } from '../../../core';

export interface IOAuthServer {
  token(req: AppRequest, res: AppResponse): Promise<Token>;
  authenticate(req: AppRequest, res: AppResponse): Promise<Token>;
}
export const IOAuthServer = Symbol.for('IOAuthServer');
