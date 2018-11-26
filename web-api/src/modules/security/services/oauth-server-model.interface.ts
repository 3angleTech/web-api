/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webFrame/LICENSE
 */

import { PasswordModel, RefreshTokenModel } from 'oauth2-server';

export interface IOAuthServerModel extends PasswordModel, RefreshTokenModel {

}
export const IOAuthServerModel = Symbol.for('IOAuthServerModel');
