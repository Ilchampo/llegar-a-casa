import type { CorsOptionsDelegate } from 'cors';
import type { Request } from 'express';

import config from '../config';
import cors from 'cors';

const corsOptions: CorsOptionsDelegate<Request> = (
  req: Request,
  callback: (err: Error | null, options?: cors.CorsOptions) => void
) => {
  let options: cors.CorsOptions;

  if (config.app.environment === 'development') {
    options = { origin: true };
  } else {
    options = { origin: config.app.cors };
  }

  callback(null, options);
};

export default corsOptions;
