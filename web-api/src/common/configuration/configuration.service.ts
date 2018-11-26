/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

import * as config from 'config';
import { injectable } from 'inversify';

import { IConfigurationService, OAuthConfiguration } from './configuration.service.interface';

@injectable()
export class ConfigurationService implements IConfigurationService {

  public getOAuthConfig(): OAuthConfiguration {
    return config.get<OAuthConfiguration>('oauth');
  }

}
