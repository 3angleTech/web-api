/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

import { NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { ActivateAccountParams, EmailParams, IEmailProviderDriver } from '../../../common/email';
import { AppRequest, AppResponse } from '../../../core';

export interface ISandboxController {
  sendMail(req: AppRequest, res: AppResponse, next: NextFunction): void;
  sendActivationMail(req: AppRequest, res: AppResponse, next: NextFunction): void;
}
export const ISandboxController = Symbol.for('ISandboxController');

@injectable()
export class SandboxController implements ISandboxController {
  constructor(
    @inject(IEmailProviderDriver) private emailService: IEmailProviderDriver,
  ) {
    this.sendMail = this.sendMail.bind(this);
    this.sendActivationMail = this.sendActivationMail.bind(this);
  }

  public sendMail(req: AppRequest, res: AppResponse, next: NextFunction): void {
    const params: EmailParams = {
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
    const params: ActivateAccountParams = {
      to: 'catalin@3angle.tech',
      from: 'webFrame@3angle.tech',
      subject: 'WebFrame test mail',
      html: 'test mail <strong>strong</strong>',
      text: 'text mail catalin@3angle.tech',
      token: '12432432432',
    };
    console.log(params);

    this.emailService.sendAccountActivationEmail(params).then(() => {
      res.json({message: 'Mail was sent succesfully.'});
    });
  }

}
