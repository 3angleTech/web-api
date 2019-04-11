/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

export interface Email {
  to: string;
  from: string;
  subject: string;
  html: string;
  text: string;
}

export interface EmailTemplateVariables {
  subject?: Object;
  html?: Object;
  text?: Object;
}

export interface ActivateAccountParameters {
  to: string;
  from: string;
  token: string;
}

export interface NewAccountParameters {
  to: string;
  from: string;
  username: string;
}

// TODO: Add documentation
export interface IEmailService {
  sendEmail(email: Email): Promise<void>;
  sendAccountActivationEmail(parameters: ActivateAccountParameters): Promise<void>;
  sendNewAccountEmail(parameters: NewAccountParameters): Promise<void>;
}
export const IEmailService = Symbol.for('IEmailService');
