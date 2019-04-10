/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

import { NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { ActivateAccountParameters, Email, IEmailService } from '../../../common/email';
import { AppRequest, AppResponse } from '../../../core';

export interface ISandboxController {
  sendMail(req: AppRequest, res: AppResponse, next: NextFunction): void;
  sendActivationMail(req: AppRequest, res: AppResponse, next: NextFunction): void;
}
export const ISandboxController = Symbol.for('ISandboxController');

@injectable()
export class SandboxController implements ISandboxController {
  constructor(
    @inject(IEmailService) private emailService: IEmailService,
  ) {
    this.sendMail = this.sendMail.bind(this);
    this.sendActivationMail = this.sendActivationMail.bind(this);
  }

  public sendMail(req: AppRequest, res: AppResponse, next: NextFunction): void {
    const params: Email = {
      to: 'catalin@3angle.tech',
      from: 'webFrame@3angle.tech',
      subject: 'WebFrame test mail',
      html: 'test mail <strong>strong</strong>',
      text: 'text mail catalin@3angle.tech',
    };
    console.log(params);

    this.emailService.sendEmail(params).then(() => {
      res.json({message: 'Mail was sent succesfully.'});
    });
  }

  public sendActivationMail(req: AppRequest, res: AppResponse, next: NextFunction): void {
    const params: ActivateAccountParameters = {
      to: 'catalin@3angle.tech',
      from: 'webFrame@3angle.tech',
      token: '12432432432',
    };

    this.emailService.sendAccountActivationEmail(params).then(() => {
      res.json({message: 'Mail was sent succesfully.'});
    });
  }

}
