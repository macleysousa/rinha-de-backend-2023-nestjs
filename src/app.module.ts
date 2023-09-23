import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';

import { AppService } from './app.service';
import ormConfig from './configs/orm.config';
import cacheConfig from './configs/cache.config';
import { PessoaModule } from './modules/pessoa/pessoa.module';

@Module({
  imports: [TypeOrmModule.forRoot({ ...ormConfig }), CacheModule.register(cacheConfig), PessoaModule],
  providers: [AppService],
})
export class AppModule {}
