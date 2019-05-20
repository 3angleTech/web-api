/**
 * @license
 * Copyright (c) 2019 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

import { NextFunction } from 'express';
import { UnauthorizedError } from '../../../common/error';
import { Logger, LogLevel } from '../../../common/logger';
import { isNil } from '../../../common/utils';
import { AppRequest, AppResponse, UserContext } from '../../../core';
import { IPasswordResetReq } from '../services/account.service.interface';

export const validAccessTokenMiddleware = async (req: AppRequest, res: AppResponse, next: NextFunction) => {
  // when resetToken is sent via URL, we initialize the authorization header used by the oauth middleware
  const passwordResetReq: IPasswordResetReq = req.body;
  if (!isNil(passwordResetReq)) {
    const accessToken: string = decodeURIComponent(passwordResetReq.token);
    req.headers.authorization = `Bearer ${accessToken}`;
  }
  try {
    const oauthServer = req.getAppContext().getOAuthServer();
    const token = await oauthServer.authenticate(req, res);
    const accountService = req.getAppContext().getAccountService();
    const user = await accountService.find(token.user.id);
    const userContext: UserContext = {
      user: user,
    };
    res.locals.userContext = userContext;
    next();
  } catch (err) {
    Logger.getInstance().log(LogLevel.Warning, err.message, { errorStack: err.stack });
    return next(new UnauthorizedError(err));
  }
};
