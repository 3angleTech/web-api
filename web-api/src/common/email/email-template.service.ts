/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */
import { inject, injectable } from 'inversify';
import { EmailTemplate, EmailTemplates, IConfigurationService } from '../configuration';
import { IStringTemplateService } from '../string-template';
import { IEmailTemplateService } from './email-template.service.interface';
import { EmailParams } from './email.service.interface';

@injectable()
export class EmailTemplateService implements IEmailTemplateService {

    private static instance: EmailTemplateService;

    constructor(
        @inject(IConfigurationService) private configuration: IConfigurationService,
        @inject(IStringTemplateService) private templateService: IStringTemplateService,
    ) {
        if (EmailTemplateService.instance) {
            return EmailTemplateService.instance;
        }
        EmailTemplateService.instance = this;
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
