import { Injectable, inject } from '@angular/core';
import { TemplateFormService } from './template-form.service';
import { PromptsRequestService } from '@core/services';
import {
  computedFormControls,
  findIndexControl,
  isNullish,
  toSignalFormArray,
} from '@shared/utils';
import { Prompt } from '@core/datatypes';
import { PromptFormFactoryService } from './prompt-form-factory.service';
import { Observable, Subject } from 'rxjs';
import { CompletionsStateService } from '../states';

@Injectable()
export class PromptsService {
  readonly #templateFormService = inject(TemplateFormService);
  readonly #completionsStateService = inject(CompletionsStateService);
  readonly #promptFormFactoryService = inject(PromptFormFactoryService);
  readonly #promptsRequestService = inject(PromptsRequestService);
  readonly templateId = this.#templateFormService.templateId;
  readonly promptsFormArray = toSignalFormArray(
    this.#templateFormService.promptFormArray
  );
  readonly promptsFormControls = computedFormControls(this.promptsFormArray);

  createPrompt(index: number, prompt: Prompt): Observable<void> {
    const isPromptCreated = new Subject<void>();
    this.#promptsRequestService.createPrompt(prompt).subscribe({
      next: (promptCreated) => {
        isPromptCreated.next();
        isPromptCreated.complete();
        this.#findAndUpdatePrompt(promptCreated, index);
      },
    });
    return isPromptCreated.asObservable();
  }

  updatePrompt(prompt: Prompt) {
    this.#promptsRequestService.updatePrompt(prompt).subscribe();
  }

  deletePrompt(index: number, prompt: Prompt) {
    if (!prompt._id) {
      this.#findAndDeletePrompt(prompt, index);
      return;
    }
    this.#promptsRequestService.deletePrompt(prompt).subscribe({
      next: (promptDeleted) => {
        this.#findAndDeletePrompt(promptDeleted);
        this.#completionsStateService.deleteCompletion(
          promptDeleted._id as string
        );
      },
    });
  }

  addPrompt() {
    const promptForm = this.#promptFormFactoryService.createForm({
      _templateId: this.templateId,
      value: '',
      vars: {},
    });
    this.promptsFormArray().push(promptForm);
  }

  #findAndUpdatePrompt(prompt: Prompt, index?: number) {
    const controlIndex =
      index ?? findIndexControl(this.promptsFormControls(), prompt);
    if (isNullish(controlIndex)) {
      throw new Error('Prompt cannot be updated from the view');
    }
    this.promptsFormArray().at(controlIndex).patchValue(prompt);
  }

  #findAndDeletePrompt(prompt: Prompt, index?: number) {
    const controlIndex =
      index ?? findIndexControl(this.promptsFormControls(), prompt);
    if (isNullish(controlIndex)) {
      throw new Error('Prompt cannot be deleted from the view');
    }
    this.promptsFormArray().removeAt(controlIndex);
  }
}
