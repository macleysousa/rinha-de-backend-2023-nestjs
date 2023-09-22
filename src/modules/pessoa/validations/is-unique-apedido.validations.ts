import { Injectable } from '@nestjs/common';
import { registerDecorator, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
import { ValidatorConstraint, ValidationArguments } from 'class-validator';

import { PessoaService } from '../pessoa.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class CategoriaConstraint implements ValidatorConstraintInterface {
  constructor(private readonly service: PessoaService) {}

  async validate(value: string): Promise<boolean> {
    return (await this.service.findByApelido(value)) ? false : true;
  }

  defaultMessage(_validationArguments?: ValidationArguments): string {
    return 'Pessoa já cadastrada';
  }
}

export const IsUniquePessoa = (validationOptions?: ValidationOptions) => {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [object],
      validator: CategoriaConstraint,
    });
  };
};
