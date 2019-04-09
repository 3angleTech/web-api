/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

import { injectable } from 'inversify';
import { Logger, LogLevel } from '../logger';
import { ActivateAccountParams, EmailParams, IEmailProviderDriver, NewAccountParams } from './email.service.interface';

@injectable()
export class MockEmailService implements IEmailProviderDriver {

    constructor() { }
    // TODO: Implement logic
    public sendEmail(params: EmailParams): Promise<void> {
        Logger.getInstance().log(LogLevel.Debug, 'Sending e-mail...');
        return Promise.resolve();
    }

}
