import { PrismaService } from '@eternalbright/nestjs-prisma';

import { Injectable, Logger } from '@nestjs/common';

import type { Prisma } from '@prisma/client';

import type {
  GetItemsQueryArgs,
  ItemCreateInput,
  ItemUpdateInput,
  PaginatedItems,
  SingleItem,
} from '../models/item.model';

@Injectable()
export class ItemRepository {
  constructor(private databaseService: PrismaService) {}

  private readonly logger = new Logger(ItemRepository.name);

  async create(itemCreateInput: ItemCreateInput): Promise<SingleItem> {
    this.logger.debug(itemCreateInput);
    this.logger.log('Creating an item');

    return { resource: await this.databaseService.item.create({ data: itemCreateInput }) };
  }

  async getAll(queryArgs: GetItemsQueryArgs): Promise<PaginatedItems> {
    this.logger.debug(queryArgs);
    this.logger.log('Fetching all items');

    const {
      category, limit = 10, page = 1, 
    } = queryArgs;

    const itemsCount = await this.databaseService.item.count();
    const itemsToSkip = (page - 1) * limit;

    const itemsSelectionArgs: Prisma.ItemFindManyArgs = {
      skip: itemsToSkip,
      take: limit,
    };

    if (category) {
      itemsSelectionArgs.where = { category };
    }

    const items = await this.databaseService.item.findMany(itemsSelectionArgs);

    return {
      pagination: {
        // Sequence number of the page
        currentPage: page,

        // Sequence number of the first record on the page
        from: itemsToSkip + 1,

        // Total amount of pages
        pageCount: Math.ceil(itemsCount / limit),

        // Records amount per page
        perPage: limit,

        // Sequence number of the last record on the page
        to: itemsToSkip + items.length,

        // Total amount of records
        total: itemsCount,
      },
      resources: items,
    };
  }

  async getById(itemId: string): Promise<SingleItem> {
    this.logger.log('Fetching an item by ID', itemId);

    return { resource: await this.databaseService.item.findUnique({ where: { id: itemId } }) };
  }

  async update(itemId: string, itemUpdateInput: ItemUpdateInput): Promise<SingleItem> {
    this.logger.debug(itemUpdateInput);
    this.logger.log('Updating an item', itemId);

    return {
      resource: await this.databaseService.item.update({
        data: itemUpdateInput,
        where: { id: itemId },
      }),
    };
  }

  async delete(itemId: string): Promise<SingleItem> {
    this.logger.debug('Deleting an item', itemId);

    return { resource: await this.databaseService.item.delete({ where: { id: itemId } }) };
  }
}
