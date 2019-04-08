/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

import { injectable } from 'inversify';
import { Logger, LogLevel } from '../logger';
import { ActivateAccountParams, EmailParams, IEmailService, NewAccountParams } from './email.service.interface';

@injectable()
export class MockEmailService implements IEmailService {

    constructor() { }

    public async sendAccountActivationEmail(params: ActivateAccountParams): Promise<void> {
        this.sendEmail(params);
        return Promise.resolve();
    }

    public sendNewAccountEmail(params: NewAccountParams): Promise<void> {
        this.sendEmail(params);
        return Promise.resolve();
    }

    public sendEmail(params: EmailParams): Promise<void> {
        Logger.getInstance().log(LogLevel.Debug, 'Sending e-mail...');
        return Promise.resolve();
    }

}
