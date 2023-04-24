import { PrismaModule } from '@eternalbright/nestjs-prisma';

import { Module } from '@nestjs/common';

import { ItemController } from './controllers/item.controller';
import { ItemRepository } from './repositories/item.repository';
import { ItemService } from './services/item.service';

@Module({
  controllers: [ItemController],
  imports: [PrismaModule],
  providers: [ItemRepository, ItemService],
})
export class ItemModule {}
