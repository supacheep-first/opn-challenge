import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as crypto from 'crypto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class UsersService {
  private users: Array<{
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

  create(createUserDto: CreateUserDto) {
    const { hashedPassword, salt } = this.hashPassword(createUserDto.password);
    const newUser = {
      id: this.users.length + 1,
      ...createUserDto,
      password: hashedPassword,
      salt,
    };
    this.users.push(newUser);
    return {
      message: 'User created successfully',
    };
  }

  findAll() {
    return this.users.map((user) => this.mappingUserResponse(user));
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      return `User with id #${id} not found`;
    }
    return this.mappingUserResponse(user);
  }

  private mappingUserResponse(user: {
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
      user;
    const age = this.calculateAge(new Date(dateOfBirth));
    return { id, email, name, age, gender, address, subscription };
  }

  private calculateAge(dateOfBirth: Date): number {
    const diff = Date.now() - dateOfBirth.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return `User with id #${id} not found`;
    }
    this.users[userIndex] = { ...this.users[userIndex], ...updateUserDto };
    return {
      message: 'User updated successfully',
    };
  }

  remove(id: number) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return `User with id #${id} not found`;
    }
    this.users.splice(userIndex, 1);
    return {
      message: 'User removed successfully',
    };
  }

  changePassword(id: number, changePasswordDto: ChangePasswordDto) {
    const { currentPassword, newPassword } = changePasswordDto;
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return `User with id #${id} not found`;
    }

    const user = this.users[userIndex];
    const hashedCurrentPassword = this.hashPasswordWithSalt(
      currentPassword,
      user.salt,
    );
    if (user.password !== hashedCurrentPassword) {
      return 'Current password is incorrect';
    }

    const { hashedPassword, salt } = this.hashPassword(newPassword);
    user.password = hashedPassword;
    user.salt = salt;
    return user;
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
