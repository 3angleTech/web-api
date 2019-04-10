/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

import { inject, injectable } from 'inversify';
import { IConfigurationService } from '../configuration';
import { IStringTemplateService } from '../string-template';
import { ActivateAccountParams, EmailParams, IEmailProviderDriver, IEmailService, NewAccountParams } from './email.service.interface';

@injectable()
export class EmailService implements IEmailService {

    constructor(
        @inject(IEmailProviderDriver) private emailDriver: IEmailProviderDriver,
        @inject(IConfigurationService) private configuration: IConfigurationService,
        @inject(IStringTemplateService) private templateService: IStringTemplateService,
    ) {
    }

    public async sendEmail(params: EmailParams): Promise<void> {
      this.emailDriver.sendEmail(params);
    }

    public async sendAccountActivationEmail(params: ActivateAccountParams): Promise<void> {
        const template = this.configuration.getEmailTemplates()['activation'];
        const parameters = {
          activationToken: params.token,
        };
        const htmlContent = this.templateService.interpolate(template.html, parameters);
        const textContent = this.templateService.interpolate(template.text, parameters);

        const localParams: EmailParams = {
          to: params.to,
          from: params.from,
          html: htmlContent,
          text: textContent,
          subject: params.subject,
        };

        await this.sendEmail(localParams);
        return Promise.resolve();
    }

    public async sendNewAccountEmail(params: NewAccountParams): Promise<void> {
        // TODO: Pass parameters such as username in e-mail
        await this.sendEmail(params);
        return Promise.resolve();
    }
}
