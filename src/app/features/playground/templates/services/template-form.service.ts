import { Injectable, inject } from '@angular/core';
import { TemplateFormFactoryService } from './template-form-factory.service';
import { FormArray, FormGroup } from '@angular/forms';
import { Sources, TemplateWithResources } from '@core/datatypes';

@Injectable()
export class TemplateFormService {
  readonly #templateFormFactoryService = inject(TemplateFormFactoryService);

  form!: FormGroup;

  get value$() {
    return this.form.valueChanges;
  }

  get templateId() {
    return this.form.get('_id')?.value;
  }

  get sourceFormArray() {
    return this.form.get('sources') as FormArray;
  }

  initializeForm(template: TemplateWithResources): void {
    const form = this.#templateFormFactoryService.createForm(template);
    this.form = form;
  }
}
