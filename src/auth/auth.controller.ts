import {
  Body,
  Controller,
  Headers,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { UserLoginDto } from 'shared/dtos/user-login.dto';
import { ApiUrls } from 'shared/enums/api-urls.enum';
import { ResponseBuilderService } from 'src/utilities/services/response-builder.service';
import { TranslationService } from 'src/utilities/services/translation.service';
import { decryptPassword } from 'src/utilities/Utils';
import { AuthService } from './auth.service';

@Controller(ApiUrls.API_URL_LOGIN)
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly translationService: TranslationService,
    private readonly responseBuilderService: ResponseBuilderService,
  ) {}

  @Post()
  async login(
    @Headers() headers,
    @Body() userLogin: UserLoginDto,
    @Res() response,
  ): Promise<{ accessToken: string }> {
    userLogin.password = decryptPassword(userLogin.password);
    if (
      await this.authService
        .validateUser(userLogin.email, userLogin.password)
        .then((res) => {
          return true;
        })
        .catch((err) => {
          return false;
        })
    ) {
      return this.responseBuilderService.buildPromiseResponse(
        this.authService.generateAccessToken(userLogin.email),
        response,
        HttpStatus.OK,
        HttpStatus.FORBIDDEN,
        this.translationService.translate(
          'error_generating_user_access_token',
          headers['Accept-Language'],
        ),
      );
    } else {
      return this.responseBuilderService.buildErrorResponse(
        response,
        HttpStatus.FORBIDDEN,
        this.translationService.translate(
          'error_user_not_valid',
          headers['Accept-Language'],
        ),
      );
    }
  }
}
