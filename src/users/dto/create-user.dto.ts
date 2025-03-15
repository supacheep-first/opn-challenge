import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Alice', description: 'The name of the user' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'alice@example.com',
    description: 'The email of the user',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: '1990-01-01',
    description: 'The date of birth of the user',
  })
  @IsNotEmpty()
  dateOfBirth: Date;

  @ApiProperty({ example: 'female', description: 'The gender of the user' })
  @IsString()
  @IsNotEmpty()
  gender: string;

  @ApiProperty({
    example: '123 Bankok, Thailand',
    description: 'The address of the user',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    example: true,
    description: 'The subscription status of the user',
  })
  @IsNotEmpty()
  subscription: boolean;
}
