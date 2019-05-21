/**
 * @license
 * Copyright (c) 2019 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

import { NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { IConfigurationService, OAuthConfiguration } from '../../../common/configuration';
import { ActivateAccountParameters, ForgotPasswordParameters, IEmailService } from '../../../common/email';
import { Logger, LogLevel } from '../../../common/logger';
import { isNil } from '../../../common/utils';
import { AppRequest, AppResponse } from '../../../core';
import { DatabaseModel, IDatabaseContext, User } from '../../../data';
import {
  ANONYMOUS_USER_ID,
  IAccountService,
  IForgotPasswordReq,
  IPasswordChangeReq,
  IPasswordResetReq,
} from '../services/account.service.interface';
import { IJwtTokenService } from '../services/jwt-token.service.interface';
import { IOAuthServer } from '../services/oauth-server.interface';
import { accessTokenCookieName, IAuthController, refreshTokenCookieName, refreshTokenGrantName } from './auth.controller.interface';

@injectable()
export class AuthController implements IAuthController {

  constructor(
    @inject(IAccountService) private accountService: IAccountService,
    @inject(IConfigurationService) private configuration: IConfigurationService,
    @inject(IDatabaseContext) private dbContext: IDatabaseContext,
    @inject(IEmailService) private emailService: IEmailService,
    @inject(IOAuthServer) private oauthServer: IOAuthServer,
    @inject(IJwtTokenService) private tokenService: IJwtTokenService,
  ) {
    this.token = this.token.bind(this);
    this.getAccount = this.getAccount.bind(this);
    this.createAccount = this.createAccount.bind(this);
    this.activateAccount = this.activateAccount.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
    this.logout = this.logout.bind(this);
  }

  private get oauthConfig(): OAuthConfiguration {
    return this.configuration.getOAuthConfig();
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
      if (!req.body.username && req.body.email) {
        const loadedUser: User = await this.accountService.findByField('email', req.body.email);
        req.body.username = loadedUser.username;
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
    delete user.password;
    res.json(user);
  }

  public async createAccount(req: AppRequest, res: AppResponse, next: NextFunction): Promise<void> {
    const userContext = res.getUserContext();
    const createdBy: number = userContext ?
      userContext.user.id :
      ANONYMOUS_USER_ID;
    const newUserPartial: Partial<User> = req.body;
    try {
      await this.accountService.create(newUserPartial, createdBy);
      res.json({ message: 'User created successfully.' });
    } catch (e) {
      Logger.getInstance().log(LogLevel.Error, `Account creation error: ${e}`);
      res.status(500).json({ message: `${e}` });
    }
  }

  public async changePassword(req: AppRequest, res: AppResponse, next: NextFunction): Promise<void> {
    const currentUser: User = res.getUserContext().user;
    const passwordChange: IPasswordChangeReq = req.body;
    // TODO: Refactor `IAccountService.verify()` to avoid loading the user a 2nd time.
    const verifiedUser = await this.accountService.verify({
      username: currentUser.username,
      password: passwordChange.currentPassword,
    });
    if (isNil(verifiedUser)) {
      Logger.getInstance().log(LogLevel.Error, 'Invalid password');
      res.status(403).json({ message: 'Invalid password' });
      return;
    }

    const changes: Partial<User> = {
      id: currentUser.id,
      password: passwordChange.newPassword,
    };
    const updatedBy: number = currentUser.id;

    try {
      await this.accountService.update(changes, updatedBy);
      res.json({ message: 'Password changed.' });
    } catch (e) {
      Logger.getInstance().log(LogLevel.Error, `Password change error: ${e}`);
      res.status(500).json({ message: `${e}` });
    }
  }

  public async forgotPassword(req: AppRequest, res: AppResponse, next: NextFunction): Promise<void> {
    const passwordResetReq: IForgotPasswordReq = req.body;

    const userObject = await this.dbContext.getModel(DatabaseModel.Users).
      findOne({
        where: {
          email: passwordResetReq.email,
        },
      });
    if (isNil(userObject)) {
      // TODO: Refactor message to avoid disclosing user account existence via forgot password requests.
      res.status(400).json({ message: 'Invalid email.' });
      return;
    }

    try {
      await this.sendForgotPasswordEmail(userObject);
      res.json({ message: 'Forgot password email sent.' });
    } catch (e) {
      throw new Error(`Error sending forgot password email: ${e}`);
    }
  }

  public async resetPassword(req: AppRequest, res: AppResponse, next: NextFunction): Promise<void> {
    const currentUser: User = res.getUserContext().user;
    const passwordReset: IPasswordResetReq = req.body;

    const changes: Partial<User> = {
      id: currentUser.id,
      password: passwordReset.newPassword,
    };
    const updatedBy: number = currentUser.id;

    try {
      await this.accountService.update(changes, updatedBy);
      res.json({ message: 'Password changed.' });
    } catch (e) {
      Logger.getInstance().log(LogLevel.Error, `Password change error: ${e}`);
      res.status(500).json({ message: `${e}` });
    }
  }

  public async activateAccount(req: AppRequest, res: AppResponse, next: NextFunction): Promise<void> {
    try {
      await this.accountService.activate(req.query.token);
      res.json({ message: 'Account activated successfully.' });
    } catch (e) {
      Logger.getInstance().log(LogLevel.Error, `Account activation Error: ${e}`);
      res.status(500).json({ message: `${e}` });
    }
  }

  public logout(req: AppRequest, res: AppResponse, next: NextFunction): void {
    res.clearCookie(accessTokenCookieName);
    res.clearCookie(refreshTokenCookieName);
    res.json({
      message: 'Logged out successfully',
    });
  }

  private async generateAccessToken(user: User): Promise<string> {
    return this.tokenService.generate({
      userId: user.id,
      clientId: this.oauthConfig.clients[0].id,
      clientSecret: this.oauthConfig.accessTokenSecret,
      expirySeconds: this.oauthConfig.clients[0].accessTokenExpirySeconds,
      grants: this.oauthConfig.clients[0].grants,
    });
  }

  private async sendForgotPasswordEmail(user: User): Promise<void> {
    if (isNil(user)) {
      throw new Error('Empty user data');
    }

    const toAddress: string = user.email;
    const fromAddress: string = this.configuration.getEmailConfig().from;

    const accessToken: string = await this.generateAccessToken(user);
    const encodedAccessToken = encodeURIComponent(accessToken);
    const passwordResetLink: string = `${this.configuration.getClientBaseUrl()}/account/reset-password?token=${encodedAccessToken}`;

    const templateParameters: ForgotPasswordParameters = {
      name: user.firstName,
      passwordResetLink: passwordResetLink,
    };

    return this.emailService.sendForgotPasswordEmail(toAddress, fromAddress, templateParameters);
  }
}
