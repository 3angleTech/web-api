/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

import { Container } from 'inversify';
import { IConfigurationService } from '../configuration';
import { EmailProvider } from './email-provider.enum';
import { EmailTemplateService } from './email-template.service';
import { IEmailTemplateService } from './email-template.service.interface';
import { IEmailProviderDriver } from './email.service.interface';
import { MockEmailService } from './mock-email.service';
import { SendGridService } from './sendgrid.service';

export function bindDependencies(container: Container): void {
    const configurationService = container.get<IConfigurationService>(IConfigurationService);
    const emailProvider = configurationService.getEmailProvider();
    if (emailProvider === EmailProvider.SendGrid) {
      container.bind<IEmailProviderDriver>(IEmailProviderDriver).to(SendGridService).inSingletonScope();
    } else {
      container.bind<IEmailProviderDriver>(IEmailProviderDriver).to(MockEmailService).inSingletonScope();
    }

    container.bind<IEmailTemplateService>(IEmailTemplateService).to(EmailTemplateService).inSingletonScope();
}
export * from './email.service.interface';
