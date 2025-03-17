import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({ example: 'Alice', description: 'The name of the customer' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'alice@example.com',
    description: 'The email of the customer',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the customer',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: '1990-01-01',
    description: 'The date of birth of the customer',
  })
  @IsNotEmpty()
  dateOfBirth: Date;

  @ApiProperty({ example: 'female', description: 'The gender of the customer' })
  @IsString()
  @IsNotEmpty()
  gender: string;

  @ApiProperty({
    example: '123 Bankok, Thailand',
    description: 'The address of the customer',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    example: true,
    description: 'The subscription status of the customer',
  })
  @IsNotEmpty()
  subscription: boolean;
}
