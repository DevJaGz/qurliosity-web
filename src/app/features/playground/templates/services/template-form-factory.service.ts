import { Injectable, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SourceFormFactoryService } from './source-form-factory.service';
import { Prompts, Sources, TemplateWithResources } from '@core/datatypes';
import { PromptFormFactoryService } from './prompt-form-factory.service';

@Injectable()
export class TemplateFormFactoryService {
  readonly #sourceFormFactoryService = inject(SourceFormFactoryService);
  readonly #promptFormFactoryService = inject(PromptFormFactoryService);
  readonly #formBuilder = inject(FormBuilder);

  createForm(template: TemplateWithResources): FormGroup {
    return this.#formBuilder.group({
      _id: [template._id, [Validators.required]],
      isDemo: [template.isDemo, [Validators.required]],
      isActive: [template.isActive, [Validators.required]],
      name: [template.name, [Validators.required]],
      description: [template.description],
      sources: this.#createSourcesFormArray(template.sources),
      prompts: this.#createPromptsFormArray(template.prompts),
    });
  }

  #createSourcesFormArray(sources: Sources): FormArray {
    const formGroups: FormGroup[] = [];
    for (const source of sources) {
      const formGroup = this.#sourceFormFactoryService.createForm(source);
      formGroups.push(formGroup);
    }
    return this.#formBuilder.array(formGroups);
  }

  #createPromptsFormArray(prompts: Prompts): FormArray {
    const formGroups: FormGroup[] = [];
    for (const prompt of prompts) {
      const formGroup = this.#promptFormFactoryService.createForm(prompt);
      formGroups.push(formGroup);
    }
    return this.#formBuilder.array(formGroups);
  }
}
