import { Module } from '@nestjs/common';
import { ResponseBuilderService } from './services/response-builder.service';
import { TranslationService } from './services/translation.service';

@Module({
  providers: [ResponseBuilderService, TranslationService],
  exports: [ResponseBuilderService, TranslationService],
})
export class UtilitiesModule {}
