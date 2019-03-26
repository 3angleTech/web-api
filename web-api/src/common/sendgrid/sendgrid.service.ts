/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

import { MailService } from '@sendgrid/mail';
import { injectable } from 'inversify';
import { Logger, LogLevel } from '../logger';
import { EmailParams } from './email-params.do';
import { HttpStatus } from './http-status';
import { ISendGridService } from './sendgrid.service.interface';

@injectable()
export class SendGridService implements ISendGridService {

    private static instance: SendGridService;
    private sgMailService: any;

    constructor() {
        if (SendGridService.instance) {
            return SendGridService.instance;
        }
        this.sgMailService = require('@sendgrid/mail');
        this.setApiKey();
        SendGridService.instance = this;
    }

    private setApiKey(): void {
        this.sgMailService.setApiKey(process.env.SENDGRID_API_KEY);
    }

    public async sendEmail(params: EmailParams): Promise<void> {
        const message = {
            to: params.to,
            from: params.from,
            subject: params.subject,
            text: params.rawText,
            html: params.htmlText,
        };
        Logger.getInstance().log(LogLevel.Debug, 'Sending e-mail...');
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

    private async printApiKeys(): Promise<void> {
        const request = {
            method: 'GET',
            url: '/v3/api_keys',
        };
        const response = await this.sgMailService.request(request);
        Logger.getInstance().log(LogLevel.Debug, `API Keys: ${response.body}`);
    }

}
