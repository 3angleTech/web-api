/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

import { NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { IConfigurationService } from '../../../common/configuration';
import { ActivateAccountParameters, Email, IEmailService } from '../../../common/email';
import { AppRequest, AppResponse } from '../../../core';

/**
 * Allows testing email service by sending sample emails.
 */
export interface ISandboxController {
  /**
   * Sends a sample activation email.
   * @param req Request object data.
   * @param res Response object data.
   * @param next Middleware function to be called.
   */
  sendActivationMail(req: AppRequest, res: AppResponse, next: NextFunction): void;
}
export const ISandboxController = Symbol.for('ISandboxController');

@injectable()
export class SandboxController implements ISandboxController {
  constructor(
    @inject(IEmailService) private emailService: IEmailService,
    @inject(IConfigurationService) private configuration: IConfigurationService,
  ) {
    this.sendActivationMail = this.sendActivationMail.bind(this);
  }

  public sendActivationMail(req: AppRequest, res: AppResponse, next: NextFunction): void {
    const to = 'catalin@3angle.tech';
    const token = req.query.token;
    const from = this.configuration.getEmailConfig().from;
    const activationLink = `${this.configuration.getOpensourceClientBaseUrl()}/account/activate?token=${token}`;

    const templateParameters: ActivateAccountParameters = {
      name: 'Gabi',
      activationLink: activationLink,
    };

    this.emailService.sendAccountActivationEmail(to, from, templateParameters).then(() => {
      res.json({ message: 'Mail was sent succesfully.' });
    }).catch((e) => {
      console.log(`Error sending sandbox activation e-mail: ${e}`);
    });
  }
}
