import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtNaverStrategy } from './strategy/jwt-social-naver.strategy';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, JwtNaverStrategy],
})
export class AuthModule {}
