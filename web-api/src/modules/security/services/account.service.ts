/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webFrame/LICENSE
 */

import { inject, injectable } from 'inversify';
import { isNil } from 'lodash';
import { verify } from '../../../common/crypto';
import { ISqlContext, SqlModel, User } from '../../../common/data-store';
import { IJsonConverterService } from '../../../common/json-converter';
import { Credentials, IAccountService } from './account.service.interface';

@injectable()
export class AccountService implements IAccountService {
  constructor(
    @inject(ISqlContext) private sqlContext: ISqlContext,
    @inject(IJsonConverterService) private jsonConverter: IJsonConverterService,
  ) { }

  public async verify(credentials: Credentials): Promise<User> {
    const userObject = await this.sqlContext.getModel(SqlModel.Users).findOne({
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
    const userObject = await this.sqlContext.getModel(SqlModel.Users).findOne({
      where: {
        id: userId,
      },
    });
    if (isNil(userObject)) {
      throw new Error('Account not found');
    }
    return this.jsonConverter.deserialize(userObject, User);
  }

}
