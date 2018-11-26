/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

import { Container } from 'inversify';
import 'reflect-metadata';

import { bindDependencies as bindConfigurationDependencies } from './common/configuration';
import { bindDependencies as bindDataStoreDependencies } from './common/data-store';
import { bindDependencies as bindJsonConvertedDependencies } from './common/json-converter';

import { bindDependencies as bindHealthCheckDependencies } from './modules/health-check';
import { bindDependencies as bindSecurityDependencies } from './modules/security';

const appContainer = new Container();

/**
 * Bind application wide dependencies.
 */
bindConfigurationDependencies(appContainer);
bindDataStoreDependencies(appContainer);
bindJsonConvertedDependencies(appContainer);
bindHealthCheckDependencies(appContainer);
bindSecurityDependencies(appContainer);

export { appContainer };
