/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

import { inject, injectable } from 'inversify';
import { EmailTemplate, IConfigurationService } from '../configuration';
import { IStringTemplateService, StringTemplateService } from '../string-template';
import { isNil, tryGetValue } from '../utils';
import { ActivateAccountParams, EmailParams, IEmailProviderDriver, IEmailService, NewAccountParams } from './email.service.interface';

interface Email {
  to: string;
  from: string;
  subject: string;
  html: string;
  text: string;
}

interface EmailTemplateVariables {
  subject?: Object;
  html?: Object;
  text?: Object;
}

class EmailBuilder {
  private _to: string;
  private _from: string;
  private _html: string;
  private _text: string;
  private _subject: string;

  private templateService: IStringTemplateService;

  constructor() {
    this.templateService = new StringTemplateService();
  }

  public set to(to: string) {
    this._to = to;
  }

  public set from(from: string) {
    this._from = from;
  }

  public set html(html: string) {
    this._html = html;
  }

  public set text(text: string) {
    this._text = text;
  }

  public set subject(subject: string) {
    this._subject = subject;
  }

  public build(templateVariables: EmailTemplateVariables): Email {
    const subjectVariables = tryGetValue(templateVariables, 'subject');
    const htmlVariables = tryGetValue(templateVariables, 'html');
    const textVariables = tryGetValue(templateVariables, 'text');

    let subject = this._subject;
    let html = this._html;
    let text = this._text;

    if (!isNil(subjectVariables)) {
      subject = this.templateService.interpolate(subject, subjectVariables);
    }

    if (!isNil(htmlVariables)) {
      html = this.templateService.interpolate(html, htmlVariables);
    }

    if (!isNil(textVariables)) {
      text = this.templateService.interpolate(text, textVariables);
    }

    return {
      to: this._to,
      from: this._from,
      subject: subject,
      html: html,
      text: text,
    };
  }
}

@injectable()
export class EmailService implements IEmailService {

    constructor(
        @inject(IEmailProviderDriver) private emailDriver: IEmailProviderDriver,
        @inject(IConfigurationService) private configuration: IConfigurationService,
        @inject(IStringTemplateService) private templateService: IStringTemplateService,
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
