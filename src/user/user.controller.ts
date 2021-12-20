import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'shared/dtos/user-create.dto';
import { UpdateUserDto } from 'shared/dtos/user-update.dto';
import { ApiUrls, ApiUserUrls } from 'shared/enums/api-urls.enum';
import { FindOneOptions } from 'typeorm';
import { ControllerAbstract } from '../abstracts/abstract.controller';
import { ResponseBuilderService } from '../utilities/services/response-builder.service';
import { TranslationService } from '../utilities/services/translation.service';
import { buildFindOneOptions } from '../utilities/Utils';
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
  public findAll(@Res() response): Promise<UserEntity[]> {
    return this.responseBuilderService.buildPromiseResponse(
      this.userService.findAll(),
      response,
      HttpStatus.OK,
      HttpStatus.FORBIDDEN,
      this.translationService.getDatabaseErrorGetUser(this.lang),
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(ApiUserUrls.API_URL_USER_BY_PROPERTIE)
  public findByPropertie(
    @Param('propertie') propertie: string,
    @Res() response,
  ): Promise<UserEntity> {
    const propertieObject: FindOneOptions = buildFindOneOptions(propertie);

    return this.responseBuilderService.buildPromiseResponse(
      this.userService.findByPropertie(propertieObject),
      response,
      HttpStatus.OK,
      HttpStatus.FORBIDDEN,
      this.translationService.getDatabaseErrorGetUserByPropertie(
        this.lang,
        Object.keys(propertieObject.where)[0],
        Object.values<string>(propertieObject.where)[0],
      ),
    );
  }
  @Post()
  public create(
    @Body() body: CreateUserDto,
    @Res() response,
  ): Promise<UserEntity> {
    return this.responseBuilderService.buildPromiseResponse(
      this.userService.create(body),
      response,
      HttpStatus.CREATED,
      HttpStatus.FORBIDDEN,
      this.translationService.getDatabaseErrorCreateUser(this.lang),
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(ApiUserUrls.API_URL_USER_BY_PROPERTIE)
  public delete(
    @Param('id') userId: number,
    @Res() response,
  ): Promise<UserEntity> {
    return this.responseBuilderService.buildPromiseResponse(
      this.userService.delete(userId),
      response,
      HttpStatus.OK,
      HttpStatus.FORBIDDEN,
      this.translationService.getDatabaseErrorDeleteUser(this.lang),
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(ApiUserUrls.API_URL_USER_BY_PROPERTIE)
  public update(
    @Param('id') userId: number,
    @Body() body: UpdateUserDto,
    @Res() response,
  ): Promise<UserEntity> {
    return this.responseBuilderService.buildPromiseResponse(
      this.userService.update(userId, body),
      response,
      HttpStatus.OK,
      HttpStatus.FORBIDDEN,
      this.translationService.getDatabaseErrorUpdateUser(this.lang),
    );
  }
}
