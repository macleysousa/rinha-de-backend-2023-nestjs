import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Query } from '@nestjs/common';

import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { PessoaService } from './pessoa.service';
import { PessoaEntity } from './entities/pessoa.entity';

@Controller()
export class PessoaController {
  constructor(private readonly service: PessoaService) {}

  @Post('/pessoas')
  async create(@Body() pessoaDto: CreatePessoaDto): Promise<string> {
    return this.service.create(pessoaDto);
  }

  @Get('/pessoas')
  async findAll(@Query('t') t: string): Promise<PessoaEntity[]> {
    return this.service.find(t);
  }

  @Get('/pessoas/:id')
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<PessoaEntity> {
    return this.service.findById(id);
  }

  @Get('/contagem-pessoas')
  async count(): Promise<number> {
    return this.service.findCount();
  }
}
