/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

export interface Email {
  to: string;
  from: string;
  templateId: string;
  dynamic_template_data: Object;
}

export interface EmailTemplateVariables {
  subject?: Object;
  html?: Object;
  text?: Object;
}

export interface ActivateAccountParameters {
  name: string;
  activationLink: string;
}

export interface NewAccountParameters {
  username: string;
}

// TODO: Add documentation
export interface IEmailService {
  sendEmail(email: Email): Promise<void>;
  sendAccountActivationEmail(to: string, from: string, templateParameters: ActivateAccountParameters): Promise<void>;
  sendNewAccountEmail(to: string, from: string, templateParameters: NewAccountParameters): Promise<void>;
}
export const IEmailService = Symbol.for('IEmailService');
