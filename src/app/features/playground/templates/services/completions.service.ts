import { Injectable, inject } from '@angular/core';
import { TemplateFormService } from './template-form.service';

@Injectable()
export class CompletionsService {
  readonly #templateFormService = inject(TemplateFormService);
  readonly templateId = this.#templateFormService.templateId;
  readonly promptFormArray = this.#templateFormService.promptFormArray;

  getCompletion(): string {
    console.log(this.promptFormArray.value);
    return '';
  }
}
