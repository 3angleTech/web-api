/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */
import { inject, injectable } from 'inversify';
import { EmailTemplate, EmailTemplates, IConfigurationService } from '../configuration';
import { IEmailTemplateService } from './email-template.service.interface';
import { EmailParams } from './email.service.interface';

@injectable()
export class EmailTemplateService implements IEmailTemplateService {

    private static instance: EmailTemplateService;

    constructor(
        @inject(IConfigurationService) private configuration: IConfigurationService,
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

    public replaceTemplateTags(template: EmailTemplate, associations: any): EmailTemplate {
        const newTemplate: EmailTemplate = {
            html: '',
            text: '',
            subject: '',
        };
        Object.keys(associations).forEach(key => {
            newTemplate.html = template.html.replace(key, associations[key]);
            newTemplate.text = template.text.replace(key, associations[key]);
            newTemplate.subject = template.subject;
        });
        return newTemplate;
    }

    public setTextParams<T extends EmailParams>(params: T, template: EmailTemplate): T {
        params.text = template.text;
        params.html = template.html;
        params.subject = template.subject;
        return params;
    }

}
