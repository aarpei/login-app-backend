import { Body, Controller, Post } from '@nestjs/common';
import { UserLoginDto } from 'shared/dtos/user-login.dto';
import { ApiUrls } from 'shared/enums/api-urls.enum';
import { AuthService } from './auth.service';

@Controller(ApiUrls.API_URL_LOGIN)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async login(
    @Body() userLogin: UserLoginDto,
  ): Promise<{ accessToken: string }> {
    console.log('userLogin', userLogin);
    const valid: boolean = await this.authService.validateUser(
      userLogin.email,
      userLogin.password,
    );
    console.log('valid', valid);
    if (!valid) {
      throw new Error();
    }

    return await this.authService.generateAccessToken(userLogin.email);
  }
}
