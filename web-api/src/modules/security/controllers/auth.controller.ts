/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

import { NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { isNil } from 'lodash';
import { Logger, LogLevel } from '../../../common/logger';
import { AppRequest, AppResponse } from '../../../core';
import { IAccountService } from '../services/account.service.interface';
import { IOAuthServer } from '../services/oauth-server.interface';
import { accessTokenCookieName, IAuthController, refreshTokenCookieName, refreshTokenGrantName } from './auth.controller.interface';

@injectable()
export class AuthController implements IAuthController {

  constructor(
    @inject(IAccountService) private accountService: IAccountService,
    @inject(IOAuthServer) private oauthServer: IOAuthServer,
  ) {
    this.token = this.token.bind(this);
    this.getAccount = this.getAccount.bind(this);
    this.activateAccount = this.activateAccount.bind(this);
    this.logout = this.logout.bind(this);
  }

  public async token(req: AppRequest, res: AppResponse, next: NextFunction): Promise<void> {
    try {
      // automatically set the accessToken and refreshToken for clients using Http Only cookies
      if (req.body.grant_type === refreshTokenGrantName) {
        const accessToken = req.cookies[accessTokenCookieName];
        const refreshToken = req.cookies[refreshTokenCookieName];
        if (!isNil(accessToken) && !isNil(refreshToken)) {
          req.body.access_token = accessToken;
          req.body.refresh_token = refreshToken;
        }
      }
      const token = await this.oauthServer.token(req, res);
      res.cookie(accessTokenCookieName, token.accessToken, {
        httpOnly: true,
      });
      res.cookie(refreshTokenCookieName, token.refreshToken, {
        httpOnly: true,
      });
      res.json({
        access_token: token.accessToken,
        refresh_token: token.refreshToken,
      });
    } catch (err) {
      Logger.getInstance().log(LogLevel.Info, err.message, { errorStack: err.stack });
      return next(err);
    }
  }

  public async getAccount(req: AppRequest, res: AppResponse, next: NextFunction): Promise<void> {
    const userId = res.getUserContext().user.id;
    const user = await this.accountService.find(userId);
    res.json(user);
  }

  public async activateAccount(req: AppRequest, res: AppResponse, next: NextFunction): Promise<void> {
    // TODO: activate account based on generated token
  }

  public logout(req: AppRequest, res: AppResponse, next: NextFunction): void {
    res.clearCookie(accessTokenCookieName);
    res.clearCookie(refreshTokenCookieName);
    res.json({
      message: 'Logged out successfully',
    });
  }

}
