export const environment = {
  typeormConfig: {
    type: 'mysql',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: 'root',
    database: 'user_login_app',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
  },
  criptography: {
    passwordCryptoJS: 'sistemas',
  },
  translatorConfig: {
    global: true,
    defaultLang: 'es',
    translationSource: 'shared/i18n',
  },
  jwtConfig: {
    secret: 'sistemas',
    signOptions: { expiresIn: '3600s' },
  },
};
