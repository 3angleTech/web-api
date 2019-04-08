/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

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

export interface IEmailService {
    sendEmail(params: EmailParams): Promise<void>;
    sendAccountActivationEmail(params: ActivateAccountParams): Promise<void>;
}
export const IEmailService = Symbol.for('IEmailService');
