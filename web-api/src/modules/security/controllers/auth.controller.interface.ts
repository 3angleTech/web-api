/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webFrame/LICENSE
 */

import { NextFunction } from 'express';
import { AppRequest, AppResponse } from '../../../core';

export const refreshTokenGrantName: string = 'refresh_token';

export const accessTokenCookieName: string = 'accessToken';
export const refreshTokenCookieName: string = 'refreshToken';

export interface IAuthController {
  token(req: AppRequest, res: AppResponse, next: NextFunction): void;
  getAccount(req: AppRequest, res: AppResponse, next: NextFunction): void;
  logout(req: AppRequest, res: AppResponse, next: NextFunction): void;
}
export const IAuthController = Symbol.for('IAuthController');
