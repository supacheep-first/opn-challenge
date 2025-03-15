import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    example: '1990-01-01',
    description: 'The date of birth of the user',
  })
  dateOfBirth?: Date;

  @ApiProperty()
  gender?: string;

  @ApiProperty({
    example: '123 Bankok, Thailand',
    description: 'The address of the user',
  })
  address?: string;

  @ApiProperty({
    example: true,
    description: 'The subscription status of the user',
  })
  subscription?: boolean;
}
