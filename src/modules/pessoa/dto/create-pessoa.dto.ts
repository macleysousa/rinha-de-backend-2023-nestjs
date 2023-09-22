import { IsNotEmpty, IsDateString, IsOptional, IsString, IsArray } from 'class-validator';

import { IsUniquePessoa } from '../validations/is-unique-apedido.validations';

export class CreatePessoaDto {
  @IsNotEmpty()
  @IsString()
  @IsUniquePessoa()
  apelido: string;

  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsDateString({ strict: true })
  nascimento: Date;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  stack: string[];
}
