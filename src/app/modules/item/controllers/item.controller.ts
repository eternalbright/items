import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { GetItemsQueryArgs, ItemCreateInput, ItemUpdateInput, PaginatedItems, SingleItem } from '../models/item.model';
import { ItemService } from '../services/item.service';

@Controller('items')
@ApiTags('items')
export class ItemController {
  constructor(private itemService: ItemService) {}

  private readonly logger = new Logger(ItemController.name);

  @Post()
  @ApiCreatedResponse({ type: SingleItem })
  async create(@Body() itemCreateInput: ItemCreateInput): Promise<SingleItem> {
    this.logger.debug(itemCreateInput);
    this.logger.log('Request to create an item');

    const item = await this.itemService.create(itemCreateInput);

    this.logger.debug(item);
    this.logger.log('Item has been created', item.resource?.id);

    return item;
  }

  @Get()
  @ApiOkResponse({ type: PaginatedItems })
  async getAll(@Query() queryArgs: GetItemsQueryArgs): Promise<PaginatedItems> {
    this.logger.debug(queryArgs);
    this.logger.log('Request to get items');

    return this.itemService.getAll(queryArgs);
  }

  @Get(':itemId')
  @ApiOkResponse({ type: SingleItem })
  async getById(@Param('itemId') itemId: string): Promise<SingleItem> {
    this.logger.log('Request to get an item by ID', itemId);

    return this.itemService.getById(itemId);
  }

  @Patch(':itemId')
  @ApiOkResponse({ type: SingleItem })
  async update(@Body() itemUpdateInput: ItemUpdateInput, @Param('itemId') itemId: string): Promise<SingleItem> {
    this.logger.debug(itemUpdateInput);
    this.logger.log('Request to update an item', itemId);

    const updatedItem = await this.itemService.update(itemId, itemUpdateInput);

    this.logger.debug(updatedItem);
    this.logger.log('Item has been updated', itemId);

    return updatedItem;
  }

  @Delete(':itemId')
  @ApiOkResponse()
  async delete(@Param('itemId') itemId: string): Promise<void> {
    this.logger.log('Request to delete an item', itemId);

    await this.itemService.delete(itemId);

    this.logger.log('Item has been deleted', itemId);
  }
}
