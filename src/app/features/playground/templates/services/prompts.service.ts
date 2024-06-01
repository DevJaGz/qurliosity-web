import { Injectable, inject } from '@angular/core';
import { TemplateFormService } from './template-form.service';
import { PromptsRequestService } from '@core/services';
import { computedFormControls, toSignalFormArray } from '@shared/utils';
import { Prompt } from '@core/datatypes';

@Injectable()
export class PromptsService {
  readonly #templateFormService = inject(TemplateFormService);
  readonly #promptsRequestService = inject(PromptsRequestService);
  readonly templateId = this.#templateFormService.templateId;
  readonly promptsFormArray = toSignalFormArray(
    this.#templateFormService.promptFormArray
  );
  readonly promptsFormControls = computedFormControls(this.promptsFormArray);

  deletePrompt(prompt: Prompt) {
    console.log('deleting prompt', prompt);
    // this.#promptsRequestService.deletePrompt(prompt).subscribe({

    // });
  }
}
