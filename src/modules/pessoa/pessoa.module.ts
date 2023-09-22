import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PessoaEntity } from './entities/pessoa.entity';
import { PessoaController } from './pessoa.controller';
import { PessoaService } from './pessoa.service';
import { CategoriaConstraint } from './validations/is-unique-apedido.validations';

@Module({
  imports: [TypeOrmModule.forFeature([PessoaEntity])],
  controllers: [PessoaController],
  providers: [PessoaService, CategoriaConstraint],
})
export class PessoaModule {}
