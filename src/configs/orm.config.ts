import { join } from 'path';

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const { DB_TYPE, DB_DATABASE, DB_HOSTNAME, DB_USERNAME } = process.env;

if (!DB_TYPE || !DB_HOSTNAME || !DB_DATABASE || !DB_USERNAME) {
  throw new Error('Database variable DB_* has not been set properly');
}

const { DB_PASSWORD, DB_PORT, DB_TIMEZONE, DB_Logger } = process.env;

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
} as TypeOrmModuleOptions;
