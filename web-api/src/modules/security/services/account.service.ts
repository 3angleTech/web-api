/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

import { inject, injectable } from 'inversify';
import { isNil } from 'lodash';
import { IConfigurationService } from '../../../common/configuration';
import { verify } from '../../../common/crypto';
import { IEmailService } from '../../../common/email';
import { IJsonConverterService } from '../../../common/json-converter';
import { DatabaseModel, IDatabaseContext, User } from '../../../data';
import { Credentials, IAccountService } from './account.service.interface';
import { IOAuthServerModel } from './oauth-server-model.interface';

@injectable()
export class AccountService implements IAccountService {
  constructor(
    @inject(IDatabaseContext) private dbContext: IDatabaseContext,
    @inject(IJsonConverterService) private jsonConverter: IJsonConverterService,
    @inject(IConfigurationService) private configuration: IConfigurationService,
    @inject(IOAuthServerModel) private oauthServerModel: IOAuthServerModel,
    @inject(IEmailService) private emailService: IEmailService,
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

  public async create(user: User): Promise<User> {
    const userObject = await this.dbContext.getModel(DatabaseModel.Users).create(user);
    if (isNil(userObject)) {
      throw new Error('Account not created');
    }
    const token = await this.generateToken(user);
    const params = {
      to: user.email,
      from: this.configuration.getEmailParams().from,
      subject: '',
      rawText: '',
      htmlText: '',
      token: token,
    };
    this.emailService.sendAccountActivationEmail(params);
    return this.jsonConverter.deserialize(userObject, User);
  }

  private async generateToken(user: User): Promise<string> {
    return this.oauthServerModel.generateAccessToken(
      this.configuration.getOAuthConfig().clients[0],
      user,
      '',
    );
  }

}
