/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

import { Email } from './email.service.interface';

/**
 * Provides the driver for the e-mail provider
 */
export interface IEmailProviderDriver {

  /**
   * Sends an email message based on a template
   *
   * @param email Contains email fields, template id and its variables
   */
  sendEmail(email: Email): Promise<void>;
}
export const IEmailProviderDriver = Symbol.for('IEmailProviderDriver');
