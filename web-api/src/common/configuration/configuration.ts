/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webFrame/LICENSE
 */

import * as config from 'config';
import { injectable } from 'inversify';

import { IConfigurationService, OAuthConfiguration } from './configuration.interface';

@injectable()
export class ConfigurationService implements IConfigurationService {

  public getOAuthConfig(): OAuthConfiguration {
    return config.get<OAuthConfiguration>('oauth');
  }

}
