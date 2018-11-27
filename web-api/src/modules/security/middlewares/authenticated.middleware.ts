/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

import { NextFunction } from 'express';
import { isNil } from 'lodash';
import { UnauthorizedError } from '../../../common/error';
import { Logger, LogLevel } from '../../../common/logger';
import { AppRequest, AppResponse, UserContext } from '../../../core';
import { accessTokenCookieName } from '../controllers/auth.controller.interface';

export const authenticated = async (req: AppRequest, res: AppResponse, next: NextFunction) => {
  // when accessToken is sent via cookie, we initialize the authorization header used by the oauth middleware
  const accessToken = req.cookies[accessTokenCookieName];
  if (!isNil(accessToken)) {
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
