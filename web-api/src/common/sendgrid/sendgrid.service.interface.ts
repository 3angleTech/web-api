/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */
import { EmailParams } from './email-params.do';
export interface ISendGridService {
    sendEmail(params: EmailParams): Promise<void>;
}
export const ISendGridService = Symbol.for('ISendGridService');
