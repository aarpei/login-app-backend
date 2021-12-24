import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { environment } from 'environment/environment';
import { UserModule } from 'src/user/user.module';
import { UtilitiesModule } from 'src/utilities/utilities.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({ ...environment.jwtConfig }),
    UtilitiesModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {
  constructor() {
    console.log(process);
  }
}
