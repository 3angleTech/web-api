/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

import { inject, injectable } from 'inversify';
import { EmailTemplate, EmailTemplates, IConfigurationService } from '../configuration';
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
        let template = this.getTemplate('activation');
        const parameters = {
          activationToken: params.token,
        };
        template = this.compileTemplate(template, parameters);
        let localParams = { ...params };
        localParams = this.setTextParams(localParams, template);
        await this.sendEmail(localParams);
        return Promise.resolve();
    }

    public async sendNewAccountEmail(params: NewAccountParams): Promise<void> {
        // TODO: Pass parameters such as username in e-mail
        await this.sendEmail(params);
        return Promise.resolve();
    }

    public getTemplate(key: string): EmailTemplate {
      const emailTemplates: EmailTemplates = this.configuration.getEmailTemplates();
      return emailTemplates[key];
    }

    public compileTemplate(template: EmailTemplate, parameters: Object): EmailTemplate {
      const htmlContent = this.templateService.interpolate(template.html, parameters);
      const textContent = this.templateService.interpolate(template.text, parameters);
      return {
          html: htmlContent,
          text: textContent,
          subject: template.subject,
      };
    }

    public setTextParams<T extends EmailParams>(params: T, template: EmailTemplate): T {
      params.text = template.text;
      params.html = template.html;
      params.subject = template.subject;
      return params;
  }
}
