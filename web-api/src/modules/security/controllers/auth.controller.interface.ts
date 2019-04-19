/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

import { NextFunction } from 'express';
import { AppRequest, AppResponse } from '../../../core';

export const refreshTokenGrantName: string = 'refresh_token';

export const accessTokenCookieName: string = 'accessToken';
export const refreshTokenCookieName: string = 'refreshToken';

/**
 * Provides authentication controller endpoints for the application.
 */
export interface IAuthController {

  /**
   * Provides a new OAuth token for an authorized token request.
   * @param req Request object data.
   * @param res Response object data.
   * @param next Middleware function to be called.
   */
  token(req: AppRequest, res: AppResponse, next: NextFunction): void;

  /**
   * Retrieves user data.
   * @param req Request object data.
   * @param res Response object data.
   * @param next Middleware function to be called.
   */
  getAccount(req: AppRequest, res: AppResponse, next: NextFunction): void;

  /**
   * Provides the log out logic.
   * @param req Request object data.
   * @param res Response object data.
   * @param next Middleware function to be called.
   */
  logout(req: AppRequest, res: AppResponse, next: NextFunction): void;

  /**
   * Provides the logic for the activation of an account.
   * @param req Request object data.
   * @param res Response object data.
   * @param next Middleware function to be called.
   */
  activateAccount(req: AppRequest, res: AppResponse, next: NextFunction): void;
}
export const IAuthController = Symbol.for('IAuthController');
