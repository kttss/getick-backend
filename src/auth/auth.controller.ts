import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dtos/login-request-dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() loginForm: LoginRequestDto): any {
    return this.authService.login(loginForm);
  }

  // @UseGuards(JwtAuthGuard)
}
