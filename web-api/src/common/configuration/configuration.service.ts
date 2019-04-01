/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

import * as config from 'config';
import { injectable } from 'inversify';

import { EmailProvider } from '../email/email-provider.enum';
import { EmailConfigurationParams, EmailTemplates, IConfigurationService, OAuthConfiguration } from './configuration.service.interface';

@injectable()
export class ConfigurationService implements IConfigurationService {

  public getOAuthConfig(): OAuthConfiguration {
    return config.get<OAuthConfiguration>('oauth');
  }

  public getEmailProvider(): EmailProvider {
    return config.get<EmailProvider>('emailProvider');
  }

  public getEmailTemplates(): EmailTemplates {
    return config.get<EmailTemplates>('emailTemplates');
  }

  public getEmailConfigurationParams(): EmailConfigurationParams {
    return config.get<EmailConfigurationParams>('emailParams');
  }

}
