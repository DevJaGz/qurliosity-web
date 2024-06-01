import { Injectable, inject } from '@angular/core';
import { TemplateFormService } from './template-form.service';
import { PromptsRequestService } from '@core/services';
import { computedFormControls, toSignalFormArray } from '@shared/utils';
import { Prompt } from '@core/datatypes';
import { PromptFormFactoryService } from './prompt-form-factory.service';

@Injectable()
export class PromptsService {
  readonly #templateFormService = inject(TemplateFormService);
  readonly #promptFormFactoryService = inject(PromptFormFactoryService);
  readonly #promptsRequestService = inject(PromptsRequestService);
  readonly templateId = this.#templateFormService.templateId;
  readonly promptsFormArray = toSignalFormArray(
    this.#templateFormService.promptFormArray
  );
  readonly promptsFormControls = computedFormControls(this.promptsFormArray);

  createPrompt(prompt: Prompt) {
    console.log('creating prompt', prompt);
    // this.#promptsRequestService.createPrompt(prompt).subscribe({
    //   next: () => {
    //     this.addPrompt();
    //   },
    // });
  }

  updatePrompt(prompt: Prompt) {
    console.log('updating prompt', prompt);
    // this.#promptsRequestService.updatePrompt(prompt).subscribe({
    //   next: () => {
    //     this.addPrompt();
    //   },
    // });
  }

  deletePrompt(prompt: Prompt) {
    console.log('deleting prompt', prompt);
    // this.#promptsRequestService.deletePrompt(prompt).subscribe({

    // });
  }

  addPrompt() {
    const promptForm = this.#promptFormFactoryService.createForm();
    this.promptsFormArray().push(promptForm);
  }
}
