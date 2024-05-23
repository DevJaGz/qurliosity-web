import { Injectable, inject } from '@angular/core';
import { TemplateState } from '../datatypes';
import { TemplateFormFactoryService } from './template-form-factory.service';
import { FormGroup } from '@angular/forms';

@Injectable()
export class TemplateFormService {
  readonly #templateFormFactoryService = inject(TemplateFormFactoryService);

  form!: FormGroup;

  initializeForm(template: TemplateState): void {
    const form = this.#templateFormFactoryService.createForm(template);
    this.form = form;
  }
}
