import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppService } from './app.service';
import ormConfig from './configs/orm.config';
import { PessoaModule } from './modules/pessoa/pessoa.module';

@Module({
  imports: [TypeOrmModule.forRoot({ ...ormConfig }), PessoaModule],
  providers: [AppService],
})
export class AppModule {}
