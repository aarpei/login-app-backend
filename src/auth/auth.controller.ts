import {
  Body,
  Controller,
  Headers,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiForbiddenResponse,
  ApiHeader,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AccessToken } from 'shared/dtos/auth/access-token.model';
import { UserLoginDto } from 'shared/dtos/user/user-login.dto';
import { ApiUrls } from 'shared/enums/api-urls.enum';
import { ResponseBuilderService } from 'src/utilities/services/response-builder.service';
import { TranslationService } from 'src/utilities/services/translation.service';
import { decryptPassword } from 'src/utilities/Utils';
import { AuthService } from './auth.service';

@ApiHeader({
  name: 'Accept-Language',
  description: 'App language',
})
@ApiTags('login')
@Controller(ApiUrls.API_URL_LOGIN)
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly translationService: TranslationService,
    private readonly responseBuilderService: ResponseBuilderService,
  ) {}

  @ApiConsumes('application/json')
  @ApiBody({
    description: 'User login data',
    type: UserLoginDto,
  })
  @ApiOkResponse({
    status: 200,
    description: 'Login successfull',
    type: AccessToken,
  })
  @ApiForbiddenResponse({ status: 403, description: 'Login failed' })
  @Post()
  async login(
    @Headers() headers,
    @Body() userLogin: UserLoginDto,
    @Res() response,
  ): Promise<AccessToken> {
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
