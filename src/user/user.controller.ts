import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'shared/dtos/user-create.dto';
import { GetUserDto } from 'shared/dtos/user-get.dto';
import { UpdateUserDto } from 'shared/dtos/user-update.dto';
import { ApiUrls, ApiUserUrls } from 'shared/enums/api-urls.enum';
import { FindOneOptions } from 'typeorm';
import { ControllerAbstract } from '../abstracts/abstract.controller';
import { ResponseBuilderService } from '../utilities/services/response-builder.service';
import { TranslationService } from '../utilities/services/translation.service';
import { buildFindOneOptions, decryptPassword } from '../utilities/Utils';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller(ApiUrls.API_URL_USER)
export class UserController extends ControllerAbstract<UserEntity> {
  lang = 'es';
  constructor(
    private readonly userService: UserService,
    private readonly responseBuilderService: ResponseBuilderService,
    private readonly translationService: TranslationService,
  ) {
    super();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  public findAll(@Headers() headers, @Res() response): Promise<UserEntity[]> {
    return this.userService
      .findAll()
      .then((users) => {
        const usersWithoutPassword: GetUserDto[] = [];

        users.forEach((user) => {
          const userWithoutPassword: GetUserDto = {
            id: user.id.toString(),
            name: user.name,
            surname: user.surname,
            email: user.email,
          };
          usersWithoutPassword.push(userWithoutPassword);
        });

        return response.status(HttpStatus.OK).json(usersWithoutPassword);
      })
      .catch((error) => {
        return response.status(HttpStatus.FORBIDDEN).json({
          messsage: this.translationService.getDatabaseErrorGetUser(
            headers['Accept-Language'],
          ),
        });
      });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(ApiUserUrls.API_URL_USER_BY_PROPERTIE)
  public findByPropertie(
    @Headers() headers,
    @Param('propertie') propertie: string,
    @Res() response,
  ): Promise<UserEntity> {
    const propertieObject: FindOneOptions = buildFindOneOptions(propertie);
    return this.userService
      .findByPropertie(propertieObject)
      .then((user) => {
        const userWithoutPassword: GetUserDto = {
          id: user.id.toString(),
          name: user.name,
          surname: user.surname,
          email: user.email,
        };
        return response.status(HttpStatus.OK).json(userWithoutPassword);
      })
      .catch((error) => {
        return response.status(HttpStatus.FORBIDDEN).json({
          messsage: this.translationService.getDatabaseErrorGetUserByPropertie(
            headers['Accept-Language'],
            Object.keys(propertieObject.where)[0],
            Object.values<string>(propertieObject.where)[0],
          ),
        });
      });
  }
  @Post()
  public create(
    @Headers() headers,
    @Body() body: CreateUserDto,
    @Res() response,
  ): Promise<UserEntity> {
    return this.responseBuilderService.buildPromiseResponse(
      this.userService.create(body),
      response,
      HttpStatus.CREATED,
      HttpStatus.FORBIDDEN,
      this.translationService.getDatabaseErrorCreateUser(
        headers['Accept-Language'],
      ),
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(ApiUserUrls.API_URL_USER_BY_PROPERTIE)
  public delete(
    @Headers() headers,
    @Param('id') userId: number,
    @Res() response,
  ): Promise<UserEntity> {
    return this.responseBuilderService.buildPromiseResponse(
      this.userService.delete(userId),
      response,
      HttpStatus.OK,
      HttpStatus.FORBIDDEN,
      this.translationService.getDatabaseErrorDeleteUser(
        headers['Accept-Language'],
      ),
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(ApiUserUrls.API_URL_USER_BY_PROPERTIE)
  public update(
    @Headers() headers,
    @Param('propertie') propertie: string,
    @Body() body: UpdateUserDto,
    @Res() response,
  ): Promise<UserEntity> {
    const propertieObject: FindOneOptions = buildFindOneOptions(propertie);
    if (body.password) {
      body.password = decryptPassword(body?.password);
    }
    return this.responseBuilderService.buildPromiseResponse(
      this.userService.update(propertieObject, body),
      response,
      HttpStatus.OK,
      HttpStatus.FORBIDDEN,
      this.translationService.getDatabaseErrorUpdateUser(
        headers['Accept-Language'],
      ),
    );
  }
}
