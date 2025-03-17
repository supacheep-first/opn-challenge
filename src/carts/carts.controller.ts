import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Post,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Get()
  findOneActiveCart() {
    return this.cartsService.findActiveCart();
  }

  @Post()
  create() {
    return this.cartsService.create();
  }

  @Post('/products')
  saveProduct(@Body() updateCartDto: UpdateCartDto) {
    return this.cartsService.saveProduct(updateCartDto);
  }

  @Get('/all')
  findAll() {
    return this.cartsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartsService.update(+id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartsService.remove(+id);
  }
  @Delete('/product/:id')
  removeProduct(@Param('id') id: string) {
    return this.cartsService.removeProduct(+id);
  }
}
