import { Module } from '@nestjs/common';
import { CustomersModule } from './customers/customers.module';
import { CartsModule } from './carts/carts.module';

@Module({
  imports: [CustomersModule, CartsModule],
})
export class AppModule {}
