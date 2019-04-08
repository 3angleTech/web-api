/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */
import { EmailTemplate } from '../configuration';
import { EmailParams } from './email.service.interface';

export interface IEmailTemplateService {

    getTemplate(key: string): EmailTemplate;
    replaceTemplateTags(template: EmailTemplate, associations: any): EmailTemplate;
    setTextParams<T extends EmailParams>(params: T, template: EmailTemplate): T;

}
export const IEmailTemplateService = Symbol.for('IEmailTemplateService');
