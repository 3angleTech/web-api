/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

import { Token } from 'oauth2-server';
import { AppRequest, AppResponse } from '../../../core';

/**
 * Wrapper to communicate with the OAuth server
 */
export interface IOAuthServer {
  /**
   * Calls the token method of OAuthServer
   * @param req Request object data
   * @param res Response object data
   */
  token(req: AppRequest, res: AppResponse): Promise<Token>;

  /**
   * Calls the authenticate method of OAuthServer
   * @param req Request object data
   * @param res Response object data
   */
  authenticate(req: AppRequest, res: AppResponse): Promise<Token>;
}
export const IOAuthServer = Symbol.for('IOAuthServer');
