/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webFrame/LICENSE
 */

import bcryptNodejs = require('bcrypt-nodejs');

export function encrypt(value: string): string {
  const saltSync = bcryptNodejs.genSaltSync();
  return bcryptNodejs.hashSync(value, saltSync);
}

export function verify(original: string, encrypted: string): boolean {
  return bcryptNodejs.compareSync(original, encrypted);
}
