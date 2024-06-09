import { Injectable, computed, inject } from '@angular/core';
import { TemplateFormService } from './template-form.service';
import { toSignalFormArray } from '@shared/utils';
import { Prompts } from '@core/datatypes';

@Injectable()
export class CompletionsService {
  readonly #templateFormService = inject(TemplateFormService);
  readonly templateId = this.#templateFormService.templateId;
  readonly promptFormArray = toSignalFormArray(
    this.#templateFormService.promptFormArray
  );
  readonly prompts = computed(() => {
    const prompts = this.promptFormArray().value as Prompts;
    return prompts.filter((prompt) => Boolean(prompt._id && prompt.value));
  });

  getCompletion(): string {
    return '';
  }
}
