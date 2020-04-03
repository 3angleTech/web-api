/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

import { Response } from 'express';

import { User } from '../data';

// tslint:disable-next-line:interface-name
export interface UserContext {
  user: User;
}

// tslint:disable-next-line:interface-name
export interface AppResponse extends Response {
  // tslint:disable-next-line:prefer-method-signature
  getUserContext: () => UserContext;
}
