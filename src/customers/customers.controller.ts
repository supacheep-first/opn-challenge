import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { ApiBody, ApiHeader, ApiTags } from '@nestjs/swagger';
import { AuthInterceptor } from '../common/interceptors/auth.interceptor';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @ApiBody({ type: CreateCustomerDto })
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  @ApiHeader({ name: 'Authorization', required: true })
  @UseInterceptors(AuthInterceptor)
  findAll() {
    const customers = this.customersService.findAll();
    return customers;
  }

  @Get(':id')
  @ApiHeader({ name: 'Authorization', required: true })
  @UseInterceptors(AuthInterceptor)
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(+id);
  }

  @Patch(':id')
  @ApiHeader({ name: 'Authorization', required: true })
  @UseInterceptors(AuthInterceptor)
  @ApiBody({ type: UpdateCustomerDto })
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  @ApiHeader({ name: 'Authorization', required: true })
  @UseInterceptors(AuthInterceptor)
  remove(@Param('id') id: string) {
    return this.customersService.remove(+id);
  }

  @Patch(':id/change-password')
  @ApiHeader({ name: 'Authorization', required: true })
  @UseInterceptors(AuthInterceptor)
  changePassword(
    @Param('id') id: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.customersService.changePassword(+id, changePasswordDto);
  }
}
