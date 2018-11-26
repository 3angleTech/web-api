/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webFrame/LICENSE
 */

import { Container } from 'inversify';
import 'reflect-metadata';

import { bindDependencies as bindConfigurationDependencies } from './common/configuration';

const appContainer = new Container();

/**
 * Bind dependencies application wide dependencies.
 */
bindConfigurationDependencies(appContainer);

export { appContainer };
