import { Injectable, computed, inject, signal } from '@angular/core';
import { TemplateFormService } from './template-form.service';
import { AICredentials } from '@core/datatypes';

@Injectable()
export class TemplateService {
  readonly #templateFormService = inject(TemplateFormService);
  readonly templateForm = this.#templateFormService.form;
}
