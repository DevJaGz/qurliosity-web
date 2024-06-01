import { Injectable, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Prompt } from '@core/datatypes';

@Injectable({
  providedIn: 'root',
})
export class PromptFormFactoryService {
  readonly #formBuilder = inject(FormBuilder);

  createForm(prompt?: Prompt): FormGroup {
    return this.#formBuilder.group({
      _id: [prompt?._id || ''],
      _templateId: [prompt?._templateId || '', [Validators.required]],
      value: [prompt?.value || '', [Validators.required]],
      vars: [prompt?.vars] || {}, // TODO: Create a form for vars
    });
  }
}
