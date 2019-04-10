/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

import { inject, injectable } from 'inversify';
import { IEmailTemplateService } from './email-template.service.interface';
import { ActivateAccountParams, EmailParams, IEmailProviderDriver, IEmailService, NewAccountParams } from './email.service.interface';

@injectable()
export class EmailService implements IEmailService {

    constructor(
        @inject(IEmailTemplateService) private emailTemplateService: IEmailTemplateService,
        @inject(IEmailProviderDriver) private emailDriver: IEmailProviderDriver,
    ) {
    }
    public async sendEmail(params: EmailParams): Promise<void> {
      this.emailDriver.sendEmail(params);
    }

    public async sendAccountActivationEmail(params: ActivateAccountParams): Promise<void> {
        let template = this.emailTemplateService.getTemplate('activation');
        const parameters = {
          activationToken: params.token,
        };
        template = this.emailTemplateService.compileTemplate(template, parameters);
        let localParams = { ...params };
        localParams = this.emailTemplateService.setTextParams(localParams, template);
        await this.sendEmail(localParams);
        return Promise.resolve();
    }

    public async sendNewAccountEmail(params: NewAccountParams): Promise<void> {
        // TODO: Pass parameters such as username in e-mail
        await this.sendEmail(params);
        return Promise.resolve();
    }
}
