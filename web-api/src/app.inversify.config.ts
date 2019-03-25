/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

import { Container } from 'inversify';
import 'reflect-metadata';

import { bindDependencies as bindConfigurationDependencies } from './common/configuration';
import { bindDependencies as bindJsonConvertedDependencies } from './common/json-converter';
import { bindDependencies as bindDataDependencies } from './data';

import { bindDependencies as bindHealthCheckDependencies } from './modules/health-check';
import { bindDependencies as bindSecurityDependencies } from './modules/security';

import { bindDependencies as bindSendGridDependencies } from './common/sendgrid';

const appContainer = new Container();

/**
 * Bind application wide dependencies.
 */
bindConfigurationDependencies(appContainer);
bindDataDependencies(appContainer);
bindJsonConvertedDependencies(appContainer);
bindHealthCheckDependencies(appContainer);
bindSecurityDependencies(appContainer);
bindSendGridDependencies(appContainer);

export { appContainer };
