import { BadRequestException, Injectable, UnprocessableEntityException, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { v4 } from 'uuid';

import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { PessoaEntity } from './entities/pessoa.entity';
import { CACHE_MANAGER, CacheStore } from '@nestjs/cache-manager';

@Injectable()
export class PessoaService {
  constructor(
    @InjectRepository(PessoaEntity)
    private repository: Repository<PessoaEntity>,
    @Inject(CACHE_MANAGER) private cacheManager: CacheStore
  ) {}

  async create(pessoaDto: CreatePessoaDto): Promise<string> {
    const pessoa = this.repository.create({ ...pessoaDto, id: v4() });

    await this.cacheManager.set(pessoa.apelido, pessoa, 60000);

    await this.repository.insert(pessoa).catch((err) => {
      throw new UnprocessableEntityException('Apelido já cadastrado');
    });

    return `/pessoa/${pessoa.id}`;
  }

  async find(t: string): Promise<PessoaEntity[]> {
    if (!t) throw new BadRequestException('Informe um termo de busca');

    const queryBuilder = this.repository.createQueryBuilder('p');
    queryBuilder.where({ id: Not(IsNull()) });
    queryBuilder.andWhere('p.apelido LIKE :apelido or p.nome LIKE :nome or p.stack LIKE :stack', {
      apelido: `%${t}%`,
      nome: `%${t}%`,
      stack: `%${t}%`,
    });
    queryBuilder.limit(50);

    return queryBuilder.getMany();
  }

  async findById(id: string): Promise<PessoaEntity> {
    const pessoa = await this.repository.findOne({ where: { id }, cache: { id, milliseconds: 5000 } });

    if (!pessoa) throw new NotFoundException('Pessoa não encontrada');

    return pessoa;
  }

  async findByApelido(apelido: string): Promise<PessoaEntity> {
    const cache = await this.cacheManager.get<PessoaEntity>(apelido);
    if (cache) return cache;

    return this.repository.findOne({ where: { apelido }, cache: { id: apelido, milliseconds: 5000 } });
  }

  async findCount(): Promise<number> {
    return this.repository.count();
  }
}
