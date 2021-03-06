/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

import { inject, injectable } from 'inversify';
import { Request as OAuth2Request, Response as OAuth2Response, Token } from 'oauth2-server';
import OAuth2Server = require('oauth2-server');
import { AppRequest, AppResponse } from '../../../core';
import { IOAuthServerModel } from './oauth-server-model.interface';
import { IOAuthServer } from './oauth-server.interface';

@injectable()
export class OAuthServer implements IOAuthServer {
  private server: OAuth2Server;

  constructor(
    @inject(IOAuthServerModel) private oauthServerModel: IOAuthServerModel,
  ) {
    this.server = new OAuth2Server({
      model: this.oauthServerModel,
      alwaysIssueNewRefreshToken: true,
    });
  }

  public async token(req: AppRequest, res: AppResponse): Promise<Token> {
    return this.server.token(new OAuth2Request(req), new OAuth2Response(res));
  }

  public async authenticate(req: AppRequest, res: AppResponse): Promise<Token> {
    return this.server.authenticate(new OAuth2Request(req), new OAuth2Response(res));
  }
}
