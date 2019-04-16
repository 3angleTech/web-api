/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

import { inject, injectable } from 'inversify';
import { IConfigurationService } from '../configuration';
import { IEmailProviderDriver } from './email-provider-driver.interface';
import { ActivateAccountParameters, Email, IEmailService, NewAccountParameters } from './email.service.interface';

@injectable()
export class EmailService implements IEmailService {

  constructor(
    @inject(IEmailProviderDriver) private emailDriver: IEmailProviderDriver,
    @inject(IConfigurationService) private configuration: IConfigurationService,
  ) {
  }

  public async sendEmail(email: Email): Promise<void> {
    try {
      await this.emailDriver.sendEmail(email);
    } catch (e) {
      throw e;
    }
  }

  public async sendAccountActivationEmail(to: string, from: string, templateParameters: ActivateAccountParameters): Promise<void> {
    const templateId = this.configuration.getEmailConfig().templateIds.accountActivation;

    const email: Email = {
      to: to,
      from: from,
      templateId: templateId,
      dynamic_template_data: templateParameters,
    };

    try {
      await this.sendEmail(email);
    } catch (e) {
      throw e;
    }
  }

  public async sendNewAccountEmail(to: string, from: string, templateParameters: NewAccountParameters): Promise<void> {
    // TODO: Pass parameters such as username in e-mail
    try {
      await this.sendEmail(null);
    } catch (e) {
      throw e;
    }
  }
}
