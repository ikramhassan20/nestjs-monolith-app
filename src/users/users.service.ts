import {Injectable, Logger} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = new User();
      user.username = createUserDto.username;
      user.password = createUserDto.password;
      user.firstName = createUserDto.firstName;
      user.lastName = createUserDto.lastName;
      user.email = createUserDto.email;
      console.log(user);
      Logger.log('User created successfully.');
      return this.usersRepository.save(user);
    }
    catch(e) {
      Logger.log(e);
      console.log(Logger);
      throw e;
    }
  }

  async updateUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = new User();
      user.username = createUserDto.username;
      user.password = createUserDto.password;
      user.firstName = createUserDto.firstName;
      user.lastName = createUserDto.lastName;
      user.email = createUserDto.email;
      console.log(user);
      Logger.log('User created successfully.');
      return this.usersRepository.save(user);
    }
    catch(e) {
      Logger.log(e);
      console.log(Logger);
      throw e;
    }
}

  /*create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.email = createUserDto.email;
    console.log(user);
    return this.usersRepository.save(user);
  }*/

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}