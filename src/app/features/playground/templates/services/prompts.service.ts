import { Injectable, inject } from '@angular/core';
import { TemplateFormService } from './template-form.service';

@Injectable({
  providedIn: 'root',
})
export class PromptsService {
  readonly #templateFormService = inject(TemplateFormService);
  readonly templateId = this.#templateFormService.templateId;
}
