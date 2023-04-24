import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsISO8601, IsPositive, IsString, IsUrl, IsUUID, Length, MinLength } from 'class-validator';

import { ApiProperty, PartialType } from '@nestjs/swagger';

export enum Category {
  DESSERT,
  DRINK,
  FOOD,
}

enum PortionUnit {
  mg,
  ml,
}

export class ItemCreateInput {
  @ApiProperty({ enum: Category })
  @IsString()
  @IsEnum(Category)
  @MinLength(1)
  category!: keyof typeof Category;

  @ApiProperty()
  @IsString()
  @Length(1, 100)
  description!: string;

  @ApiProperty()
  @IsString()
  @IsUrl()
  @Length(1, 100)
  imageUrl!: string;

  @ApiProperty()
  @IsString()
  @Length(1, 20)
  name!: string;

  @ApiProperty({ minimum: 1 })
  @IsInt()
  @IsPositive()
  portion!: number;

  @ApiProperty({ enum: PortionUnit })
  @IsString()
  @IsEnum(PortionUnit)
  @MinLength(1)
  portionUnit!: keyof typeof PortionUnit;

  @ApiProperty({ minimum: 1 })
  @IsInt()
  @IsPositive()
  price!: number;
}

export class ItemUpdateInput extends PartialType(ItemCreateInput) {}

class Item extends ItemCreateInput {
  @ApiProperty()
  @IsString()
  @IsUUID()
  @MinLength(1)
  id!: string;

  @ApiProperty()
  @IsString()
  @IsISO8601()
  @MinLength(1)
  createdAt!: Date;

  @ApiProperty()
  @IsString()
  @IsISO8601()
  @MinLength(1)
  updatedAt!: Date;
}

export class GetItemsQueryArgs {
  @ApiProperty({ enum: Category })
  @IsEnum(Category)
  @IsString()
  @MinLength(1)
  category?: keyof typeof Category;

  @ApiProperty({ minimum: 1 })
  @Type(() => Number)
  @IsPositive()
  limit!: number;

  @ApiProperty({ minimum: 1 })
  @Type(() => Number)
  @IsPositive()
  page!: number;
}

class PaginationOpts {
  @ApiProperty()
  currentPage!: number;

  @ApiProperty()
  from!: number;

  @ApiProperty()
  pageCount!: number;

  @ApiProperty()
  perPage!: number;

  @ApiProperty()
  to!: number;

  @ApiProperty()
  total!: number;
}

export class PaginatedItems {
  @ApiProperty({ type: PaginationOpts })
  pagination!: PaginationOpts;

  @ApiProperty({ isArray: true, type: Item })
  resources!: Array<Item>;
}

export class SingleItem {
  @ApiProperty({ type: Item })
  resource!: Item | null;
}
