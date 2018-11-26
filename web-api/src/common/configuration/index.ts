/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webFrame/LICENSE
 */

import { Container } from 'inversify';
import { ConfigurationService } from './configuration';
import { IConfigurationService } from './configuration.interface';

export function bindDependencies(container: Container): void {
  container.bind<IConfigurationService>(IConfigurationService).to(ConfigurationService);
}

export * from './configuration.interface';
