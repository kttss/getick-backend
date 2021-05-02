import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginRequestDto } from './dtos/login-request-dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly userService: UserService) {}

  async login(loginFom: LoginRequestDto): Promise<any> {
    const user = await this.userService.findByEmail(loginFom.email);

    if (user.password === loginFom.password) {
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
