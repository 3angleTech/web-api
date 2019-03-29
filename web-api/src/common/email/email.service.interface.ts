/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */
import { ActivateAccountParams } from '../../data/data-objects/email/activate-account-params.do';
export interface IEmailService {
    sendAccountActivationEmail(params: ActivateAccountParams): Promise<void>;
}
export const IEmailService = Symbol.for('IEmailService');
