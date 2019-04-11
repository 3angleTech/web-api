/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

import { inject, injectable } from 'inversify';
import { IConfigurationService } from '../configuration';
import { EmailBuilder } from './email-builder';
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
      this.emailDriver.sendEmail(email);
    }

    public async sendAccountActivationEmail(parameters: ActivateAccountParameters): Promise<void> {
        const template = this.configuration.getEmailTemplates()['activation'];

        const emailBuilder = new EmailBuilder();
        emailBuilder.to = parameters.to;
        emailBuilder.from = parameters.from;

        emailBuilder.subject = template.subject;
        emailBuilder.html = template.html;
        emailBuilder.text = template.text;

        const templateVariables = {
          activationToken: parameters.token,
        };

        const email = emailBuilder.build({
          html: templateVariables,
          text: templateVariables,
        });

        await this.sendEmail(email);
        return Promise.resolve();
    }

    public async sendNewAccountEmail(parameters: NewAccountParameters): Promise<void> {
        // TODO: Pass parameters such as username in e-mail
        await this.sendEmail(null);
        return Promise.resolve();
    }
}
