/**
 * @license
 * Copyright (c) 2019 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */
import * as express from 'express';

export function createExpressApplication(): express.Express {
  return express();
}

export function createExpressRouter(): express.Router {
  return express.Router();
}
