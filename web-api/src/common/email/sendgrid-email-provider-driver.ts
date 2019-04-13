/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

import * as sendGrid from '@sendgrid/mail';
import * as HttpStatus from 'http-status-codes';
import { injectable } from 'inversify';
import { Logger, LogLevel } from '../logger';
import { IEmailProviderDriver } from './email-provider-driver.interface';
import { Email } from './email.service.interface';

@injectable()
export class SendGridEmailProviderDriver implements IEmailProviderDriver {

    constructor(
    ) {
      this.setApiKey();
    }

    private setApiKey(): void {
        sendGrid.setApiKey(process.env.SENDGRID_API_KEY);
    }

    // tslint:disable-next-line:max-func-body-length
    public async sendEmail(email: Email): Promise<void> {
      const message = {
        to: email.to,
        from: email.from,
        templateId: email.templateId,
        dynamic_template_data: email.dynamic_template_data,
      };

      const response = await sendGrid.send(message);

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
