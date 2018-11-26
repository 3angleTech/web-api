/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webFrame/LICENSE
 */

import * as cors from 'cors';
import * as express from 'express';

// tslint:disable-next-line:no-duplicate-imports
import { Express } from 'express';

class App {
  public express: Express;

  constructor() {
    this.express = express();
    this.express.use(cors());
  }

}
export default new App().express;
