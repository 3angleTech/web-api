/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

import { injectable } from 'inversify';
import { Email, IEmailProviderDriver } from '.';
import { Logger, LogLevel } from '../logger';

@injectable()
export class MockEmailService implements IEmailProviderDriver {

    constructor() { }
    // TODO: Implement logic
    public sendEmail(email: Email): Promise<void> {
        Logger.getInstance().log(LogLevel.Debug, 'Sending e-mail...');
        return Promise.resolve();
    }

}
