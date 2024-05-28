import { Injectable, inject } from '@angular/core';
import { TemplateFormFactoryService } from './template-form-factory.service';
import { FormGroup } from '@angular/forms';
import { TemplateWithResources } from '@core/datatypes';

@Injectable()
export class TemplateFormService {
  readonly #templateFormFactoryService = inject(TemplateFormFactoryService);

  form!: FormGroup;

  initializeForm(template: TemplateWithResources): void {
    const form = this.#templateFormFactoryService.createForm(template);
    this.form = form;
  }
}
