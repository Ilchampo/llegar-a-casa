import type { IConfig } from './interfaces/config.interface';
import type { Environment } from './types/enviroment.types';
import dotenv from 'dotenv';

dotenv.config();

const config: IConfig = {
  app: {
    port: process.env.PORT ? Number(process.env.PORT) : 3000,
    environment: (process.env.ENVIRONMENT as Environment) ?? 'development',
    cors: process.env.CORS_ORIGIN_WHITELIST ?? '*',
  },
  scrappers: {
    reports: process.env.SCRAPPER_PERSON_REPORT_URL ?? '',
    vehicle: process.env.SCRAPPER_VEHICLE_INFO_URL ?? '',
    cookie: process.env.SCRAPPER_PERSON_COOKIE ?? '',
  },
} as const;

export default config;
