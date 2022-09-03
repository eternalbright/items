import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { DatabaseExceptionsFilter } from './filters/exception.filter';
import { DatabaseService } from './services/database.service';

@Module({
  providers: [
    DatabaseService,
    {
      provide: APP_FILTER,
      useClass: DatabaseExceptionsFilter,
    },
  ],
  exports: [DatabaseService],
})
export class DatabaseModule {}
