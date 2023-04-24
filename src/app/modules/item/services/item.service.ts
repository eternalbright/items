import { Injectable, Logger } from '@nestjs/common';

import type {
  GetItemsQueryArgs,
  ItemCreateInput,
  ItemUpdateInput,
  PaginatedItems,
  SingleItem,
} from '../models/item.model';

import { ItemRepository } from '../repositories/item.repository';

@Injectable()
export class ItemService {
  constructor(private readonly itemRepository: ItemRepository) {}

  private readonly logger = new Logger(ItemService.name);

  public async create(itemCreateInput: ItemCreateInput): Promise<SingleItem> {
    this.logger.debug(itemCreateInput);
    this.logger.log('Creating an item');

    return this.itemRepository.create(itemCreateInput);
  }

  public async getAll(queryArgs: GetItemsQueryArgs): Promise<PaginatedItems> {
    this.logger.debug(queryArgs);
    this.logger.log('Fetching all items');

    return this.itemRepository.getAll(queryArgs);
  }

  public async getById(itemId: string): Promise<SingleItem> {
    this.logger.log('Fetching an item by ID', itemId);

    return this.itemRepository.getById(itemId);
  }

  public async update(itemId: string, itemUpdateInput: ItemUpdateInput): Promise<SingleItem> {
    this.logger.debug(itemUpdateInput);
    this.logger.log('Updating an item', itemId);

    return this.itemRepository.update(itemId, itemUpdateInput);
  }

  public async delete(itemId: string): Promise<SingleItem> {
    this.logger.log('Deleting an item', itemId);

    return this.itemRepository.delete(itemId);
  }
}
