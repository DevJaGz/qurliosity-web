import { Injectable, computed, inject } from '@angular/core';
import { TemplateFormService } from './template-form.service';
import { toSignalFormArray } from '@shared/utils';

@Injectable()
export class CompletionsService {
  readonly #templateFormService = inject(TemplateFormService);
  readonly templateId = this.#templateFormService.templateId;
  readonly promptFormArray = toSignalFormArray(
    this.#templateFormService.promptFormArray
  );
  readonly prompts = computed(() => this.promptFormArray().value);

  getCompletion(): string {
    console.log(this.prompts());
    return '';
  }
}
