import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
//import { RpcException } from '@nestjs/microservices'
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import { Repository } from 'typeorm';

import { CreateAuthUserDto, VerifyUserByEmailDto } from '../users/dto/create-user.dto';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly authUserRepository: Repository<User>
  ) {}

  public async getAuthUser(id: number): Promise<User> {
    return this.authUserRepository
      .findOneOrFail({ id })
      .catch(() => {
        //throw new RpcException(
        throw new NotFoundException('User with provided id does not exist')
        //)
      })
      .then(user => this.toPublicUser(user))
  }

  public async verifyAuthUserByEmail(dto: VerifyUserByEmailDto) {
    const auth = await this.authUserRepository.findOne({ email: dto.email });
    if (!auth) {
      throw new NotFoundException('User with provided email does not exist')
    }

    const passHash = crypto
        .createHmac('sha256', auth.passwordSalt)
        .update(dto.password)
        .digest('hex')
    if (auth.password === passHash) {
      return this.toPublicUser(auth);
    } else {
      throw new UnauthorizedException('Password is incorrect')
    }
  }

  private toPublicUser(auth: User): any {
    const { password, ...result } = auth;
    return result;
  }
};