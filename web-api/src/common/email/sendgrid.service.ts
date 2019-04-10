/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

import * as sendGrid from '@sendgrid/mail';
import { inject, injectable } from 'inversify';
import { IConfigurationService } from '../configuration';
import { Logger, LogLevel } from '../logger';
import { Email, IEmailProviderDriver } from './email.service.interface';
import { HttpStatus } from './http-status';

@injectable()
export class SendGridService implements IEmailProviderDriver {

    constructor(
        @inject(IConfigurationService) private configuration: IConfigurationService,
    ) {
      this.setApiKey();
    }

    private setApiKey(): void {
        sendGrid.setApiKey(process.env.SENDGRID_API_KEY);
    }

    public async sendEmail(email: Email): Promise<void> {
        const mailData = {
            to: email.to,
            from: email.from,
            subject: email.subject,
            text: email.text,
            html: email.html,
        };
        const response = await sendGrid.send(mailData);

        const statusCode = response[0].statusCode;
        if (statusCode === HttpStatus.ACCEPTED) {
            return;
        }

        Logger.getInstance().log(LogLevel.Error, `Error sending e-mail to ${email.to}`, {
            sendGridResponse: response[0],
            email: email,
        });
        throw new Error(`Error Sending Email to ${email.to}`);
    }
}
