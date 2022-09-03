import { Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

import { Prisma } from '@prisma/client';

@Catch()
export class DatabaseExceptionsFilter extends BaseExceptionFilter {
  override catch(e: unknown, host: ArgumentsHost) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      throw new BadRequestException(e.meta?.cause);
    }

    super.catch(e, host);
  }
}
