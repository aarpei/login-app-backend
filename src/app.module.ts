import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TranslatorModule } from 'nestjs-translator';
import { environment } from '../environment/environment';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      ...environment.typeormConfig,
    } as TypeOrmModuleOptions),
    TranslatorModule.forRoot({ ...environment.translatorConfig }),
    AuthModule,
  ],
})
export class AppModule {}
