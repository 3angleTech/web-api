/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

import { Email } from './email.service.interface';

// TODO: Add documentation
export interface IEmailProviderDriver {
  sendEmail(email: Email): Promise<string>;
}
export const IEmailProviderDriver = Symbol.for('IEmailProviderDriver');
