import { Injectable } from '@nestjs/common';
import { TranslatorService } from 'nestjs-translator';

@Injectable()
export class TranslationService {
  constructor(private translatorService: TranslatorService) {}

  private getDatabaseError(action: string, type: string, lang: string): string {
    return this.translatorService.translate('error_database', {
      lang: lang,
      replace: {
        action: this.translate(action, lang),
        type: this.translate(type, lang),
      },
    });
  }
  private getDatabasePropertieError(
    action: string,
    type: string,
    propertieName: string,
    propertieValue: string,
    lang: string,
  ): string {
    return this.translatorService.translate('error_database_propertie', {
      lang: lang,
      replace: {
        action: this.translate(action, lang),
        type: this.translate(type, lang),
        propertie_name: propertieName,
        propertie_value: propertieValue,
      },
    });
  }

  public getDatabaseErrorCreateUser(lang: string): string {
    return this.getDatabaseError('database_create', 'type_user', lang);
  }
  public getDatabaseErrorDeleteUser(lang: string): string {
    return this.getDatabaseError('database_delete', 'type_user', lang);
  }
  public getDatabaseErrorGetUser(lang: string): string {
    return this.getDatabaseError('database_get', 'type_user', lang);
  }
  public getDatabaseErrorGetUserByPropertie(
    lang: string,
    propertieName: string,
    propetieValue: string,
  ): string {
    return this.getDatabasePropertieError(
      'database_get',
      'type_user',
      propertieName,
      propetieValue,
      lang,
    );
  }
  public getDatabaseErrorUpdateUser(lang: string): string {
    return this.getDatabaseError('database_update', 'type_user', lang);
  }

  private translate(value: string, lang: string): string {
    return this.translatorService.translate(value, {
      lang: lang,
    });
  }
}
