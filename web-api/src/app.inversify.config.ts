/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webFrame/LICENSE
 */

import { Container } from 'inversify';
import 'reflect-metadata';

import { bindDependencies as bindConfigurationDependencies } from './common/configuration';
import { bindDependencies as bindDataStoreDependencies } from './common/data-store';
import { bindDependencies as bindJsonConvertedDependencies } from './common/json-converter';

import { bindDependencies as bindSecurityDependencies } from './modules/security';

const appContainer = new Container();

/**
 * Bind dependencies application wide dependencies.
 */
bindConfigurationDependencies(appContainer);
bindDataStoreDependencies(appContainer);
bindJsonConvertedDependencies(appContainer);
bindSecurityDependencies(appContainer);

export { appContainer };
