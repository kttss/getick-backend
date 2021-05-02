import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';
import { LoginRequestDto } from './dtos/login-request-dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly userService: UserService) {}

  async login(loginFom: LoginRequestDto): Promise<any> {
    const user = await this.userService.findByEmail(loginFom.email);
    const isMatch = await bcrypt.compare(loginFom.password, user.password);
    if (isMatch) {
      const payload = {
        username: user.username,
        email: user.email,
        lastname: user.lastname,
        firstname: user.firstname,
        role: user.role,
        id: user.id
      };
      return {
        token: this.jwtService.sign(payload)
      };
    } else {
      throw new UnauthorizedException('password incorrect');
    }
  }
}
