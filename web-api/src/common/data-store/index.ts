/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

import { Container } from 'inversify';
import { SqlContext } from './sql-context';
import { ISqlContext } from './sql-context.interface';

export function bindDependencies(container: Container): void {
  container.bind<ISqlContext>(ISqlContext).to(SqlContext).inSingletonScope();
}

export * from './data-objects/user.do';
export * from './sql-context.interface';
