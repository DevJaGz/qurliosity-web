import { Injectable, computed, inject, signal } from '@angular/core';
import { TemplateFormService } from './template-form.service';
import { AICredentials } from '@core/datatypes';

@Injectable()
export class TemplateService {
  readonly #templateFormService = inject(TemplateFormService);
  readonly templateForm = this.#templateFormService.form;

  readonly #AICredentials = signal<AICredentials>({
    embedderCredential: {
      apiKey: '',
      brandId: '',
      modelName: '',
    },
  });

  readonly AICredentials = this.#AICredentials.asReadonly();

  readonly hasAICredentials = computed(() => {
    const embedderCredential = this.#AICredentials().embedderCredential;
    if (!embedderCredential) return false;

    const embedderCredentialValues = Object.values(embedderCredential);
    const hasAICredentials = embedderCredentialValues.every(Boolean);
    return hasAICredentials;
  });
}
