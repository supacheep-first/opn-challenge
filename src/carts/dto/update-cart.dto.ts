import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsOptional } from 'class-validator';

export class UpdateCartDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  @Type(() => Product)
  products: Product[];

  @ApiProperty({ required: false })
  @IsOptional()
  discountCode?: string;
}

class Product {
  id: number;
  productName: string;
  price: number;
  variant: ProductVariants;
}

class ProductVariants {
  productId: number;
  value: string;
  quantity: number;
}
