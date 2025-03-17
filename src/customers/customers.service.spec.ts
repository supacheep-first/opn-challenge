import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from './customers.service';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

describe('CustomersService', () => {
  let service: CustomersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomersService],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a customer', () => {
    const createCustomerDto: CreateCustomerDto = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      dateOfBirth: new Date('1990-01-01'),
      gender: 'male',
      address: '123 Main St',
      subscription: true,
    };
    const result = service.create(createCustomerDto);
    expect(result).toEqual({ message: 'Customer created successfully' });
    expect(service.findAll()).toHaveLength(1);
  });

  it('should find all customers', () => {
    const createCustomerDto: CreateCustomerDto = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      dateOfBirth: new Date('1990-01-01'),
      gender: 'male',
      address: '123 Main St',
      subscription: true,
    };
    service.create(createCustomerDto);
    const customers = service.findAll();
    expect(customers).toHaveLength(1);
  });

  it('should find one customer by id', () => {
    const createCustomerDto: CreateCustomerDto = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      dateOfBirth: new Date('1990-01-01'),
      gender: 'male',
      address: '123 Main St',
      subscription: true,
    };
    service.create(createCustomerDto);
    const customer = service.findOne(1) as {
      id: number;
      email: string;
    };
    expect(customer).toBeDefined();
    expect(customer?.email).toEqual('john.doe@example.com');
  });

  it('should update a customer', () => {
    const createCustomerDto: CreateCustomerDto = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      dateOfBirth: new Date('1990-01-01'),
      gender: 'male',
      address: '123 Main St',
      subscription: true,
    };
    service.create(createCustomerDto);
    const updateCustomerDto: UpdateCustomerDto = {
      address: 'Jane Doe',
    };
    const result = service.update(1, updateCustomerDto);
    expect(result).toEqual({ message: 'Customer updated successfully' });
    const customer = service.findOne(1) as { address: string };
    expect(customer.address).toBe('Jane Doe');
  });

  it('should remove a customer', () => {
    const createCustomerDto: CreateCustomerDto = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      dateOfBirth: new Date('1990-01-01'),
      gender: 'male',
      address: '123 Main St',
      subscription: true,
    };
    service.create(createCustomerDto);
    const result = service.remove(1);
    expect(result).toEqual({ message: 'Customer removed successfully' });
    expect(service.findAll()).toHaveLength(0);
  });

  it('should change customer password', () => {
    const createCustomerDto: CreateCustomerDto = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      dateOfBirth: new Date('1990-01-01'),
      gender: 'male',
      address: '123 Main St',
      subscription: true,
    };
    service.create(createCustomerDto);
    const changePasswordDto: ChangePasswordDto = {
      currentPassword: 'password123',
      newPassword: 'newpassword123',
    };
    const customer = service.changePassword(1, changePasswordDto);
    expect(customer).toBeDefined();
  });
});
