/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

import { Container } from 'inversify';
import { SendGridService } from './sendgrid.service';
import { ISendGridService } from './sendgrid.service.interface';

export function bindDependencies(container: Container): void {
    container.bind<ISendGridService>(ISendGridService).to(SendGridService);
}
export * from './sendgrid.service.interface';
export * from './sendgrid.service';
