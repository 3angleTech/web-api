/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

import { inject, injectable } from 'inversify';
import { sign, verify as verifyToken } from 'jsonwebtoken';
import { IConfigurationService, OAuthConfiguration } from '../../../common/configuration';
import { IJwtTokenService, TokenGenerateOptions, TokenPayload } from './jwt-token.service.interface';

@injectable()
export class JwtTokenService implements IJwtTokenService {

  constructor(
    @inject(IConfigurationService) private configuration: IConfigurationService,
  ) { }

  public generate(options: TokenGenerateOptions): Promise<string> {
    const expiresAt = new Date(
      new Date().getTime() + (options.expirySeconds * 1000),
    );
    const payload: TokenPayload = {
      userId: options.userId,
      clientId: options.clientId,
      grants: options.grants,
      issuer: this.oauthConfig.issuer,
      expiresAt: expiresAt,
    };
    const token = sign(payload, options.clientSecret, {
      algorithm: this.oauthConfig.algorithm,
    });
    return Promise.resolve(token);
  }

  public verify(token: string, clientSecret: string): Promise<TokenPayload> {
    const decoded = <any>verifyToken(token, clientSecret);
    return Promise.resolve(decoded);
  }

  private get oauthConfig(): OAuthConfiguration {
    return this.configuration.getOAuthConfig();
  }

}
