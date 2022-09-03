import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

import type { Item as ItemModel } from '@prisma/client';

import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsISO8601, IsPositive, IsString, IsUrl, IsUUID, Length, MinLength } from 'class-validator';

export enum Category {
  DESSERT = 'DESSERT',
  DRINK = 'DRINK',
  FOOD = 'FOOD',
}

enum PortionUnit {
  MG = 'mg',
  ML = 'ml',
}

export class ItemCreateInput {
  @ApiProperty()
  @IsString()
  @IsEnum(Category)
  @MinLength(1)
  category: Category;

  @ApiProperty()
  @IsString()
  @Length(1, 100)
  description: string;

  @ApiProperty()
  @IsString()
  @IsUrl()
  @Length(1, 100)
  imageUrl: string;

  @ApiProperty()
  @IsString()
  @Length(1, 20)
  name: string;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  portion: number;

  @ApiProperty()
  @IsString()
  @IsEnum(PortionUnit)
  @MinLength(1)
  portionUnit: PortionUnit;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  price: number;
}

export class ItemUpdateInput extends PartialType(ItemCreateInput) {}

export class Item extends ItemCreateInput {
  @ApiProperty()
  @IsString()
  @IsUUID()
  @MinLength(1)
  id: string;

  @ApiProperty()
  @IsString()
  @IsISO8601()
  @MinLength(1)
  createdAt: string;

  @ApiProperty()
  @IsString()
  @IsISO8601()
  @MinLength(1)
  updatedAt: string;
}

export class GetItemsQueryArgs {
  @IsEnum(Category)
  @IsString()
  @MinLength(1)
  category?: Category;

  @Type(() => Number)
  @IsPositive()
  limit: number;

  @Type(() => Number)
  @IsPositive()
  page: number;
}

export interface PaginatedItems {
  pagination: {
    currentPage: number;
    from: number;
    pageCount: number;
    perPage: number;
    to: number;
    total: number;
  };
  resources: ItemModel[];
}

export interface SingleItem {
  resource: ItemModel | null;
}
