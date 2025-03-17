import { ApiProperty } from '@nestjs/swagger';

export class UpdateCustomerDto {
  @ApiProperty({
    example: '1990-01-01',
    description: 'The date of birth of the customer',
  })
  dateOfBirth?: Date;

  @ApiProperty()
  gender?: string;

  @ApiProperty({
    example: '123 Bankok, Thailand',
    description: 'The address of the customer',
  })
  address?: string;

  @ApiProperty({
    example: true,
    description: 'The subscription status of the customer',
  })
  subscription?: boolean;
}
