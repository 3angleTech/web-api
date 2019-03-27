/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

import { Container } from 'inversify';
import { MockEmailService } from './email.service';
import { IEmailService } from './email.service.interface';
import { SendGridService } from './sendgrid.service';

export function bindDependencies(container: Container): void {
    container.bind<IEmailService>(IEmailService).to(SendGridService);
    container.bind<IEmailService>(IEmailService).to(MockEmailService);
}
export * from './email.service.interface';
