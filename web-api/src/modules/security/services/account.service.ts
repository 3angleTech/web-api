/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

import { inject, injectable } from 'inversify';
import { IConfigurationService, OAuthConfiguration } from '../../../common/configuration';
import { encrypt, verify } from '../../../common/crypto';
import { ActivateAccountParameters, IEmailService } from '../../../common/email';
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
    @inject(IEmailService) private emailService: IEmailService,
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

  public async findByField(field: string, value: any): Promise<User> {
    const userObject = await this.dbContext.getModel(DatabaseModel.Users).findOne({
      where: {
        [field]: value,
      },
    });
    if (isNil(userObject)) {
      return null;
    }
    return this.jsonConverter.deserialize(userObject, User);
  }

  public async activate(token: string): Promise<void> {
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
    const affectedRows: User[] = result[1];
    if (isNil(affectedRows)) {
      throw new Error(`User not found (ID = ${jwtToken.userId})`);
    }
  }

  public async generateActivationToken(user: User): Promise<string> {
    return this.tokenService.generate({
      userId: user.id,
      clientId: this.oauthConfig.clients[0].id,
      clientSecret: this.oauthConfig.clients[0].secret,
      expirySeconds: this.oauthConfig.clients[0].activationTokenExpirySeconds,
      grants: this.oauthConfig.clients[0].grants,
    });
  }

  public async create(user: User): Promise<void> {
    if (isNil(user)) {
      throw new Error('No user data sent');
    }
    const userExists = await this.userExists(user);
    if (userExists) {
      throw new Error('An user account with the same username or email already exists');
    }
    user.password = encrypt(user.password);
    const createdUser = await this.dbContext.getModel(DatabaseModel.Users).create(user);
    if (isNil(createdUser)) {
      throw new Error('Account not created');
    }
    await this.sendAccountActivationEmail(createdUser);
  }

  private async userExists(user: User): Promise<boolean> {
    const userWithSameUsername = await this.findByField('username', user.username);
    if (!isNil(userWithSameUsername)) {
      return true;
    }
    const userWithSameEmail = await this.findByField('email', user.email);
    if (!isNil(userWithSameEmail)) {
      return true;
    }
    console.log('Returning false');
    return false;
  }

  private async sendAccountActivationEmail(user: User): Promise<void> {
    if (isNil(user)) {
      throw new Error('Empty user data');
    }
    const token = await this.generateActivationToken(user);
    const to = user.email;
    const from = this.configuration.getEmailConfig().from;
    const activationLink = `${this.configuration.getClientBaseUrl()}/account/activate?token=${token}`;

    const templateParameters: ActivateAccountParameters = {
      name: user.firstName,
      activationLink: activationLink,
    };

    try {
      await this.emailService.sendAccountActivationEmail(to, from, templateParameters);
    } catch (e) {
      throw new Error(`Error sending sandbox activation e-mail: ${e}`);
    }
  }

  private get oauthConfig(): OAuthConfiguration {
    return this.configuration.getOAuthConfig();
  }

}
