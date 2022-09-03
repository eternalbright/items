import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';

import { ItemController } from './controllers/item.controller';
import { ItemRepository } from './repositories/item.repository';
import { ItemService } from './services/item.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ItemController],
  providers: [ItemRepository, ItemService],
})
export class ItemModule {}
