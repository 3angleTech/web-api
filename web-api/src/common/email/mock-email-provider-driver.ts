/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

import { injectable } from 'inversify';

import { IEmailProviderDriver } from './email-provider-driver.interface';
import { Email } from './email.service.interface';

@injectable()
export class MockEmailProviderDriver implements IEmailProviderDriver {

  constructor() {
  }

  public async sendEmail(email: Email): Promise<void> {
    // tslint:disable-next-line:no-console
    console.log(email);

    return;
  }
}
