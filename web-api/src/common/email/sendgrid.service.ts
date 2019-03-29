/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

import { MailService } from '@sendgrid/mail';
import { inject, injectable } from 'inversify';
import { ActivateAccountParams as AccountActivationParams } from '../../data/data-objects/email/activate-account-params.do';
import { EmailParams } from '../../data/data-objects/email/email-params.do';
import { NewAccountParams } from '../../data/data-objects/email/new-account-params.do';
import { EmailTemplate, EmailTemplates, IConfigurationService } from '../configuration';
import { Logger, LogLevel } from '../logger';
import { IEmailService } from './email.service.interface';
import { HttpStatus } from './http-status';

@injectable()
export class SendGridService implements IEmailService {

    private static instance: SendGridService;
    private sgMailService: any;

    constructor(
        @inject(IConfigurationService) private configuration: IConfigurationService,
    ) {
        if (SendGridService.instance) {
            return SendGridService.instance;
        }
        this.sgMailService = require('@sendgrid/mail');
        SendGridService.instance = this;
    }

    private setApiKey(): void {
        this.sgMailService.setApiKey(process.env.SENDGRID_API_KEY);
    }

    public async sendAccountActivationEmail(params: AccountActivationParams): Promise<void> {
        let template = this.getTemplate('activation');
        const replaceTags = {
            '[JWT_TOKEN]': params.token,
        };
        template = this.replaceTemplateTags(template, replaceTags);
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

    private async sendEmail(params: EmailParams): Promise<void> {
        this.setApiKey();
        const message = {
            to: params.to,
            from: params.from,
            subject: params.subject,
            text: params.rawText,
            html: params.htmlText,
        };
        Logger.getInstance().log(LogLevel.Debug, 'Sending e-mail...', message);
        const response = await this.sgMailService.send(message);
        const statusCode = response[0].statusCode;
        if (statusCode === HttpStatus.ACCEPTED) {
            return;
        }
        Logger.getInstance().log(LogLevel.Error, `Error sending e-mail to ${params.to}`, {
            sendGridResponse: response[0],
            parameters: params,
        });
        throw new Error(`Error Sending Email to ${params.to}`);
    }

    private getTemplate(key: string): EmailTemplate {
        const emailTemplates: EmailTemplates = this.configuration.getEmailTemplates();
        return emailTemplates[key];
    }

    private setTextParams(params: AccountActivationParams, template: EmailTemplate): AccountActivationParams {
        params.rawText = template.raw;
        params.htmlText = template.html;
        return params;
    }

    private replaceTemplateTags(template: EmailTemplate, associations: any): EmailTemplate {
        const newTemplate: EmailTemplate = {
            html: '',
            raw: '',
        };
        Object.keys(associations).forEach(key => {
            newTemplate.html = template.html.replace(key, associations[key]);
            newTemplate.raw = template.raw.replace(key, associations[key]);
        });
        return newTemplate;
    }

    private async printApiKeys(): Promise<void> {
        const request = {
            method: 'GET',
            url: '/v3/api_keys',
        };
        const response = await this.sgMailService.request(request);
        Logger.getInstance().log(LogLevel.Debug, `API Keys: ${response.body}`);
    }

}
