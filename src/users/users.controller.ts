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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiHeader, ApiTags } from '@nestjs/swagger';
import { ChangePasswordDto } from './dto/change-password.dto';
import { AuthInterceptor } from '../common/interceptors/auth.interceptor';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiHeader({ name: 'Authorization', required: true })
  @UseInterceptors(AuthInterceptor)
  findAll() {
    const users = this.usersService.findAll();
    return users;
  }

  @Get(':id')
  @ApiHeader({ name: 'Authorization', required: true })
  @UseInterceptors(AuthInterceptor)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiHeader({ name: 'Authorization', required: true })
  @UseInterceptors(AuthInterceptor)
  @ApiBody({ type: UpdateUserDto })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiHeader({ name: 'Authorization', required: true })
  @UseInterceptors(AuthInterceptor)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Patch(':id/change-password')
  @ApiHeader({ name: 'Authorization', required: true })
  @UseInterceptors(AuthInterceptor)
  changePassword(
    @Param('id') id: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.usersService.changePassword(+id, changePasswordDto);
  }
}
