/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import * as crypto from 'crypto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class CustomersService {
  private customers: Array<{
    id: number;
    name: string;
    email: string;
    password: string;
    dateOfBirth: Date;
    gender: string;
    address: string;
    subscription: boolean;
    salt: string;
  }> = [];

  create(createCustomerDto: CreateCustomerDto) {
    const { hashedPassword, salt } = this.hashPassword(
      createCustomerDto.password,
    );
    const newCustomer = {
      id: this.customers.length + 1,
      ...createCustomerDto,
      password: hashedPassword,
      salt,
    };
    this.customers.push(newCustomer);
    return {
      message: 'Customer created successfully',
    };
  }

  findAll() {
    return this.customers.map((customer) =>
      this.mappingCustomerResponse(customer),
    );
  }

  findOne(id: number) {
    const customer = this.customers.find((customer) => customer.id === id);
    if (!customer) {
      return `Customer with id #${id} not found`;
    }
    return this.mappingCustomerResponse(customer);
  }

  private mappingCustomerResponse(customer: {
    id: number;
    name: string;
    email: string;
    password: string;
    dateOfBirth: Date;
    gender: string;
    address: string;
    subscription: boolean;
    salt: string;
  }) {
    const { id, email, name, dateOfBirth, gender, address, subscription } =
      customer;
    const age = this.calculateAge(new Date(dateOfBirth));
    return { id, email, name, age, gender, address, subscription };
  }

  private calculateAge(dateOfBirth: Date): number {
    const diff = Date.now() - dateOfBirth.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const customerIndex = this.customers.findIndex(
      (customer) => customer.id === id,
    );
    if (customerIndex === -1) {
      return `Customer with id #${id} not found`;
    }
    this.customers[customerIndex] = {
      ...this.customers[customerIndex],
      ...updateCustomerDto,
    };
    return {
      message: 'Customer updated successfully',
    };
  }

  remove(id: number) {
    const customerIndex = this.customers.findIndex(
      (customer) => customer.id === id,
    );
    if (customerIndex === -1) {
      return `Customer with id #${id} not found`;
    }
    this.customers.splice(customerIndex, 1);
    return {
      message: 'Customer removed successfully',
    };
  }

  changePassword(id: number, changePasswordDto: ChangePasswordDto) {
    const { currentPassword, newPassword } = changePasswordDto;
    const customerIndex = this.customers.findIndex(
      (customer) => customer.id === id,
    );
    if (customerIndex === -1) {
      return `Customer with id #${id} not found`;
    }

    const customer = this.customers[customerIndex];
    const hashedCurrentPassword = this.hashPasswordWithSalt(
      currentPassword,
      customer.salt,
    );
    if (customer.password !== hashedCurrentPassword) {
      return 'Current password is incorrect';
    }

    const { hashedPassword, salt } = this.hashPassword(newPassword);
    customer.password = hashedPassword;
    customer.salt = salt;
    return customer;
  }

  private hashPassword(password: string) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hashedPassword = this.hashPasswordWithSalt(password, salt);
    return { hashedPassword, salt };
  }

  private hashPasswordWithSalt(password: string, salt: string) {
    return crypto
      .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
      .toString('hex');
  }
}
