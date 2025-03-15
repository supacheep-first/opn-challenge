import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', () => {
    const createUserDto: CreateUserDto = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      dateOfBirth: new Date('1990-01-01'),
      gender: 'male',
      address: '123 Main St',
      subscription: true,
    };
    const result = service.create(createUserDto);
    expect(result).toEqual({ message: 'User created successfully' });
    expect(service.findAll()).toHaveLength(1);
  });

  it('should find all users', () => {
    const createUserDto: CreateUserDto = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      dateOfBirth: new Date('1990-01-01'),
      gender: 'male',
      address: '123 Main St',
      subscription: true,
    };
    service.create(createUserDto);
    const users = service.findAll();
    expect(users).toHaveLength(1);
  });

  it('should find one user by id', () => {
    const createUserDto: CreateUserDto = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      dateOfBirth: new Date('1990-01-01'),
      gender: 'male',
      address: '123 Main St',
      subscription: true,
    };
    service.create(createUserDto);
    const user = service.findOne(1) as {
      id: number;
      email: string;
    };
    expect(user).toBeDefined();
    expect(user?.email).toEqual('john.doe@example.com');
  });

  it('should update a user', () => {
    const createUserDto: CreateUserDto = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      dateOfBirth: new Date('1990-01-01'),
      gender: 'male',
      address: '123 Main St',
      subscription: true,
    };
    service.create(createUserDto);
    const updateUserDto: UpdateUserDto = {
      address: 'Jane Doe',
    };
    const result = service.update(1, updateUserDto);
    expect(result).toEqual({ message: 'User updated successfully' });
    const user = service.findOne(1) as { address: string };
    expect(user.address).toBe('Jane Doe');
  });

  it('should remove a user', () => {
    const createUserDto: CreateUserDto = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      dateOfBirth: new Date('1990-01-01'),
      gender: 'male',
      address: '123 Main St',
      subscription: true,
    };
    service.create(createUserDto);
    const result = service.remove(1);
    expect(result).toEqual({ message: 'User removed successfully' });
    expect(service.findAll()).toHaveLength(0);
  });

  it('should change user password', () => {
    const createUserDto: CreateUserDto = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      dateOfBirth: new Date('1990-01-01'),
      gender: 'male',
      address: '123 Main St',
      subscription: true,
    };
    service.create(createUserDto);
    const changePasswordDto: ChangePasswordDto = {
      currentPassword: 'password123',
      newPassword: 'newpassword123',
    };
    const user = service.changePassword(1, changePasswordDto);
    expect(user).toBeDefined();
  });
});
