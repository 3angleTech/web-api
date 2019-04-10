/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

import { inject, injectable } from 'inversify';
import { IConfigurationService } from '../configuration';
import { EmailBuilder } from './email-builder';
import { ActivateAccountParams, Email, IEmailProviderDriver, IEmailService, NewAccountParams } from './email.service.interface';

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

    public async sendAccountActivationEmail(params: ActivateAccountParams): Promise<void> {
        const template = this.configuration.getEmailTemplates()['activation'];

        const emailBuilder = new EmailBuilder();
        emailBuilder.to = params.to;
        emailBuilder.from = params.from;
        emailBuilder.subject = params.subject;
        emailBuilder.html = template.html;
        emailBuilder.text = template.text;

        const parameters = {
          activationToken: params.token,
        };

        const email = emailBuilder.build({
          html: parameters,
          text: parameters,
        });

        await this.sendEmail(email);
        return Promise.resolve();
    }

    public async sendNewAccountEmail(params: NewAccountParams): Promise<void> {
        // TODO: Pass parameters such as username in e-mail
        await this.sendEmail(params);
        return Promise.resolve();
    }
}
