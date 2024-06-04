import { Injectable, inject } from '@angular/core';
import { TemplateFormService } from './template-form.service';
import { PromptsRequestService } from '@core/services';
import {
  computedFormControls,
  findIndexControl,
  toSignalFormArray,
} from '@shared/utils';
import { Prompt } from '@core/datatypes';
import { PromptFormFactoryService } from './prompt-form-factory.service';
import { Observable, Subject } from 'rxjs';

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

  createPrompt(prompt: Prompt): Observable<void> {
    console.log('creating prompt', prompt);
    const isPromptCreated = new Subject<void>();
    this.#promptsRequestService.createPrompt(prompt).subscribe({
      next: (promptCreated) => {
        isPromptCreated.next();
        isPromptCreated.complete();
        this.#findAndUpdatePrompt(promptCreated);
      },
    });
    return isPromptCreated.asObservable();
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
    if (!prompt._id) {
      this.#findAndDeletePrompt(prompt);
      return;
    }
    // this.#promptsRequestService.deletePrompt(prompt).subscribe({

    // });
  }

  addPrompt() {
    const promptForm = this.#promptFormFactoryService.createForm({
      _templateId: this.templateId,
      value: '',
      vars: {},
    });
    this.promptsFormArray().push(promptForm);
  }

  #findAndUpdatePrompt(prompt: Prompt) {
    const index = findIndexControl(this.promptsFormControls(), prompt);
    if (!index) {
      throw new Error('Prompt cannot be updated from the view');
    }
    this.promptsFormArray().at(index).patchValue(prompt);
  }

  #findAndDeletePrompt(prompt: Prompt) {
    const index = findIndexControl(this.promptsFormControls(), prompt);
    if (!index) {
      throw new Error('Prompt cannot be deleted from the view');
    }
    this.promptsFormArray().removeAt(index);
  }
}
