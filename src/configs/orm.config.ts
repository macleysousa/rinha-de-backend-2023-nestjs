import { join } from 'path';

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const { DB_TYPE, DB_DATABASE, DB_HOSTNAME, DB_USERNAME, DB_ENTITIES, DB_MIGRATIONS } = process.env;

if (!DB_TYPE || !DB_HOSTNAME || !DB_DATABASE || !DB_USERNAME || !DB_ENTITIES || !DB_MIGRATIONS) {
  throw new Error('Database variable DB_* has not been set properly');
}

const { DB_PASSWORD, DB_PORT, DB_TIMEZONE, DB_Logger, REDIS_URL } = process.env;

const cache = () => {
  if (REDIS_URL == undefined || REDIS_URL == '') {
    return false;
  }

  const REDIS_HOST = REDIS_URL.split('@')[1].split(':')[0];
  const REDIS_PORT = REDIS_URL.split('@')[1].split(':')[1];
  const REDIS_PASSWORD = REDIS_URL.split('@')[0].split(':')[2];
  return {
    duration: 30000,
    type: 'redis',
    options: {
      password: REDIS_PASSWORD,
      socket: {
        host: REDIS_HOST,
        port: +REDIS_PORT,
      },
    },
  };
};

export default {
  type: DB_TYPE,
  host: DB_HOSTNAME,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: +DB_PORT || 3306,
  autoLoadEntities: true,
  synchronize: true,
  logging: DB_Logger === 'true' ? true : false,
  entities: [join(__dirname, '../modules/**/*.entity.js')],
  migrations: [join(__dirname, '../migrations/*{.ts,.js}')],
  migrationsRun: true,
  timezone: DB_TIMEZONE || '+00:00',
  cache: cache(),
} as TypeOrmModuleOptions;
