import { HttpException, ValidationError } from '@nestjs/common';

export const ValidationExceptionFactory = (validationErrors: ValidationError[]) => {
  if (validationErrors.length) {
    const errors = {};

    validationErrors.forEach((e) => {
      errors[e.property] = Object.values(e.constraints);
    });

    throw new HttpException({ statusCode: 422, message: 'Validation errors', errors }, 422);
  }
};
