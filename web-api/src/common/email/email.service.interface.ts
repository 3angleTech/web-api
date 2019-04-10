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

export interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;
}

export interface ActivateAccountParams extends EmailParams {
  token: string;
}

export interface NewAccountParams extends EmailParams {
  username: string;
}

// TODO: Add documentation
export interface IEmailProviderDriver {
    sendEmail(params: EmailParams): Promise<void>;
}
export const IEmailProviderDriver = Symbol.for('IEmailProviderDriver');

// TODO: Add documentation
export interface IEmailService {
  sendEmail(params: EmailParams): Promise<void>;
  sendAccountActivationEmail(params: ActivateAccountParams): Promise<void>;
  sendNewAccountEmail(params: NewAccountParams): Promise<void>;
}
export const IEmailService = Symbol.for('IEmailService');
