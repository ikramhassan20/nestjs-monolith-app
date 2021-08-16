import { Post, Controller, UseFilters, Get, Param, Body} from '@nestjs/common';
//import { MessagePattern } from '@nestjs/microservices'

//import { ExceptionFilter } from '../common/filters/exception.filter'
import { CreateUserDto, VerifyUserByEmailDto} from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { User } from "../users/user.entity";

@Controller('auth')
//@UseFilters(ExceptionFilter)
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  //@MessagePattern({ cmd: 'createAuthUser' })
  //public async createAuthUser(
  //  createAuthUserDto: CreateAuthUserDto
  //): Promise<any> {
  //  return this.authService.createAuthUser(createAuthUserDto)
  //}

  //@MessagePattern({ cmd: 'getAuthUser' })
  public async getAuthUser(id: number): Promise<any> {
    return this.authService.getAuthUser(id)
  }

  //@MessagePattern({ cmd: 'verifyAuthUserByEmail' })
  @Post('login')
  verify(@Body() userAuthDto: VerifyUserByEmailDto): Promise<User> {
    return this.authService.verifyAuthUserByEmail(userAuthDto);
  }
  // public async verifyUserByEmail(dto: VerifyUserByEmailDto): Promise<any> {
  //   return this.authService.verifyAuthUserByEmail(dto)
  // }
}