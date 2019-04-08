/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */
import { ActivateAccountParams } from '../../data/data-objects/email/activate-account-params.do';
import { EmailParams } from '../../data/data-objects/email/email-params.do';

export interface IEmailService {
    sendEmail(params: EmailParams): Promise<void>;
    sendAccountActivationEmail(params: ActivateAccountParams): Promise<void>;
}
export const IEmailService = Symbol.for('IEmailService');
