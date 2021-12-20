import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TranslatorModule } from 'nestjs-translator';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'user_login_app',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TranslatorModule.forRoot({
      global: true,
      defaultLang: 'es',
      translationSource: 'shared/i18n',
    }),
    AuthModule,
  ],
})
export class AppModule {}
