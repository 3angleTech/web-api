/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

import { NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { IEmailService } from '../../../common/email';
import { AppRequest, AppResponse } from '../../../core';
import { EmailParams } from '../../../data/data-objects/email/email-params.do';

export interface ISandboxController {
  sendMail(req: AppRequest, res: AppResponse, next: NextFunction): void;
}
export const ISandboxController = Symbol.for('ISandboxController');

@injectable()
export class SandboxController implements ISandboxController {
  constructor(
    @inject(IEmailService) private emailService: IEmailService,
  ) {
    this.sendMail = this.sendMail.bind(this);
  }

  public sendMail(req: AppRequest, res: AppResponse, next: NextFunction): void {
    const params: EmailParams = {
      to: 'catalin@3angle.tech',
      from: 'webFrame@3angle.tech',
      subject: 'WebFrame test mail',
      htmlText: 'test mail',
      rawText: 'catalin@3angle.tech',
    };
    console.log(params);

    this.emailService.sendEmail(params).then(() => {
      res.json({message: 'Mail was sent succesfully.'});
    });

  }
}
