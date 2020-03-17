/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

import app from './app';
import { Logger, LogLevel } from './common/logger';

const port = process.env.PORT || 3000;

app.listen(port).on('listening', (): void => {
  Logger.getInstance().log(LogLevel.Info, `Server is listening on port ${port}`);
}).on('error', (err: any): void => {
  Logger.getInstance().log(LogLevel.Error, 'The server could not be started.', err);
  process.exit(1);
});
