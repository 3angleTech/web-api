/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webFrame/LICENSE
 */

import * as cors from 'cors';
import * as express from 'express';

import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
// tslint:disable-next-line:no-duplicate-imports
import { Express, NextFunction, Request, Response } from 'express';
import { appContainer } from './app.inversify.config';
import { ISqlContext } from './common/data-store';
import { errorMiddleware } from './common/error';
import { AppContext, AppRequest, AppResponse } from './core';
import { IHealthCheckController } from './modules/health-check';
import { authenticated, IAuthController } from './modules/security';

class App {
  public express: Express;

  private authController: IAuthController;
  private healthCheckController: IHealthCheckController;

  constructor() {
    this.express = express();
    this.express.use(cors());
    this.initialize();
    this.initControllers();
    this.registerMiddlewares();
    this.registerRoutes();
  }

  private initialize(): void {
    /**
     * ISqlContext is a singleton scoped service
     * We force its instantiation to make sure the database connection is initialized.
     */
    appContainer.get<ISqlContext>(ISqlContext);

    /**
     * Make appContext available across the application.
     */
    this.express.locals.appContext = new AppContext(appContainer);
  }

  private initControllers(): void {
    this.healthCheckController = appContainer.get<IHealthCheckController>(IHealthCheckController);
    this.authController = appContainer.get<IAuthController>(IAuthController);
  }

  private registerMiddlewares(): void {
    this.express.use(cookieParser());
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(bodyParser.json());

    this.express.use((req: Request, res: Response, next: NextFunction) => {
      const appReq: AppRequest = req as any as AppRequest;
      appReq.getAppContext = () => {
        return appReq.app.locals.appContext;
      };

      const appRes: AppResponse = res as any as AppResponse;
      appRes.getUserContext = () => {
        return appRes.locals.userContext;
      };
      next();
    });
  }

  private registerRoutes(): void {
    const router = express.Router();

    router.route('/health-check')
      .get(this.healthCheckController.run);

    router.route('/auth/token')
      .post(this.authController.token);
    router.route('/auth/logout')
      .get(this.authController.logout);

    router.route('/account/me')
      .get(authenticated, this.authController.getAccount);

    this.express.use('/api/v1', router);
    this.express.use(errorMiddleware);
  }

}
export default new App().express;
