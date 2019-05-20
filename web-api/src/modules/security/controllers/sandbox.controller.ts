/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

import { NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { IConfigurationService } from '../../../common/configuration';
import { ActivateAccountParameters, Email, IEmailService } from '../../../common/email';
import { isNil } from '../../../common/utils';
import { AppRequest, AppResponse } from '../../../core';
import { IAccountService } from '../services/account.service.interface';
import { IJwtTokenService } from '../services/jwt-token.service.interface';

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
    @inject(IAccountService) private accountService: IAccountService,
    @inject(IJwtTokenService) private tokenService: IJwtTokenService,
  ) {
    this.sendActivationMail = this.sendActivationMail.bind(this);
  }

  public async sendActivationMail(req: AppRequest, res: AppResponse, next: NextFunction): Promise<void> {
    const user = await this.accountService.find(7);
    if (isNil(user)) {
      throw new Error('User not found');
    }
    const token = await this.accountService.generateActivationToken(user);
    const to = user.email;
    const from = this.configuration.getEmailConfig().from;
    const activationLink = `${this.configuration.getClientBaseUrl()}/account/activate?token=${token}`;

    const templateParameters: ActivateAccountParameters = {
      name: user.firstName,
      activationLink: activationLink,
    };

    this.emailService.sendAccountActivationEmail(to, from, templateParameters).then(() => {
      res.json({ message: 'Mail was sent successfully.' });
    }).catch((e) => {
      console.log(`Error sending sandbox activation e-mail: ${e}`);
    });
  }
}
