/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

import { injectable } from 'inversify';
import { Email, IEmailProviderDriver } from '.';

@injectable()
export class MockEmailProviderDriver implements IEmailProviderDriver {

    constructor() { }

    public sendEmail(email: Email): Promise<void> {
        console.log(email);
        return;
    }
}
