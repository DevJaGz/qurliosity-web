import { Injectable, computed, inject } from '@angular/core';
import { TemplateFormService } from './template-form.service';
import { toSignalFormArray } from '@shared/utils';
import { Prompt, Prompts } from '@core/datatypes';
import { CompletionsRequestService } from '@core/services';
import { AiCredentialsService } from '@shared/services';

@Injectable()
export class CompletionsService {
  readonly #templateFormService = inject(TemplateFormService);
  readonly #aiCredentialsService = inject(AiCredentialsService);
  readonly #completionsRequestService = inject(CompletionsRequestService);
  readonly templateId = this.#templateFormService.templateId;
  readonly promptFormArray = toSignalFormArray(
    this.#templateFormService.promptFormArray
  );
  readonly prompts = computed(() => {
    const prompts = this.promptFormArray().value as Prompts;
    return prompts.filter((prompt) => Boolean(prompt._id && prompt.value));
  });

  getCompletion(prompt: Prompt) {
    return this.#completionsRequestService.getCompletion(
      this.templateId,
      prompt,
      this.#aiCredentialsService.AICredentials()
    );
  }
}
