/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

import { User } from '../../../data';

export interface Credentials {
  username: string;
  password: string;
}

export interface IAccountService {
  verify(credentials: Credentials): Promise<User>;
  find(userId: number): Promise<User>;
  activate(token: string): Promise<string>;
}
export const IAccountService = Symbol.for('IAccountService');
