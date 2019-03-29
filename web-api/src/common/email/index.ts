/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

import { Container } from 'inversify';
import { IConfigurationService } from '../configuration';
import { EmailProvider } from './email-provider.enum';
import { IEmailService } from './email.service.interface';
import { MockEmailService } from './mock-email.service';
import { SendGridService } from './sendgrid.service';

export function bindDependencies(container: Container): void {
    const configurationService = container.get<IConfigurationService>(IConfigurationService);
    const emailProvider = configurationService.getEmailProvider();
    if (emailProvider === EmailProvider.SendGrid) {
        container.bind<IEmailService>(IEmailService).to(SendGridService);
    } else {
        container.bind<IEmailService>(IEmailService).to(MockEmailService);
    }
}
export * from './email.service.interface';
