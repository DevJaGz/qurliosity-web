import { Injectable, inject } from '@angular/core';
import { TemplateFormService } from './template-form.service';

@Injectable()
export class TemplateService {
  readonly #templateFormService = inject(TemplateFormService);
  readonly templateForm = this.#templateFormService.form;
}
