/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

import { inject, injectable } from 'inversify';
import { IConfigurationService, OAuthConfiguration } from '../../../common/configuration';
import { verify } from '../../../common/crypto';
import { IEmailProviderDriver } from '../../../common/email';
import { IJsonConverterService } from '../../../common/json-converter';
import { Logger, LogLevel } from '../../../common/logger';
import { isNil } from '../../../common/utils';
import { DatabaseModel, IDatabaseContext, User } from '../../../data';
import { Credentials, IAccountService } from './account.service.interface';
import { IJwtTokenService } from './jwt-token.service.interface';

@injectable()
export class AccountService implements IAccountService {
  constructor(
    @inject(IDatabaseContext) private dbContext: IDatabaseContext,
    @inject(IJsonConverterService) private jsonConverter: IJsonConverterService,
    @inject(IConfigurationService) private configuration: IConfigurationService,
    @inject(IEmailProviderDriver) private emailService: IEmailProviderDriver,
    @inject(IJwtTokenService) private tokenService: IJwtTokenService,
  ) { }

  public async verify(credentials: Credentials): Promise<User> {
    const userObject = await this.dbContext.getModel(DatabaseModel.Users).findOne({
      where: {
        username: credentials.username,
      },
    });
    if (isNil(userObject)) {
      throw new Error('Invalid username or password');
    }
    const user: User = this.jsonConverter.deserialize(userObject, User);
    const valid = verify(credentials.password, user.password);
    if (!valid) {
      throw new Error('Invalid username or password');
    }
    return user;
  }

  public async find(userId: number): Promise<User> {
    const userObject = await this.dbContext.getModel(DatabaseModel.Users).findOne({
      where: {
        id: userId,
      },
    });
    if (isNil(userObject)) {
      throw new Error('Account not found');
    }
    return this.jsonConverter.deserialize(userObject, User);
  }

  public async activate(token: string): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      try {
        const jwtToken = await this.tokenService.verify(token, this.configuration.getOAuthConfig().clients[0].secret);
        if (isNil(jwtToken.userId)) {
          throw new Error('Token doesn\'t have the user ID set');
        }
        Logger.getInstance().log(LogLevel.Debug, `Decoded token ${jwtToken.userId}`);
        const result = await this.dbContext.getModel(DatabaseModel.Users).update({
          active: true,
        }, {
            where: {
              id: jwtToken.userId,
            },
            returning: true,
          });
        const noAffectedRows: number = result[0];
        const affectedRows: User[] = result[1];
        if (isNil(affectedRows)) {
          throw new Error(`User not found (ID = ${jwtToken.userId})`);
        }
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  private async generateAccessToken(user: User): Promise<string> {
    return this.tokenService.generate({
      userId: user.id,
      clientId: this.oauthConfig.clients[0].id,
      clientSecret: this.oauthConfig.clients[0].secret,
      expirySeconds: this.oauthConfig.clients[0].accessTokenExpirySeconds,
      grants: this.oauthConfig.clients[0].grants,
    });
  }

  private get oauthConfig(): OAuthConfiguration {
    return this.configuration.getOAuthConfig();
  }

}
