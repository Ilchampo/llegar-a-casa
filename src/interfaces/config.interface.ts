import type { Environment } from '../types/enviroment.types';

export interface IConfig {
  app: {
    port: number;
    environment: Environment;
    cors: string;
  };
  scrappers: {
    launcher: string;
    reports: string;
    vehicle: string;
    cookie: string;
  };
}
