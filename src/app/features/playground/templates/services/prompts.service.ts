import { Injectable, inject } from '@angular/core';
import { TemplateFormService } from './template-form.service';
import { PromptsRequestService } from '@core/services';
import { computedFormControls, toSignalFormArray } from '@shared/utils';

@Injectable({
  providedIn: 'root',
})
export class PromptsService {
  readonly #templateFormService = inject(TemplateFormService);
  readonly #promptsRequestService = inject(PromptsRequestService);
  readonly templateId = this.#templateFormService.templateId;
  readonly promptsFormArray = toSignalFormArray(
    this.#templateFormService.promptFormArray
  );
  readonly promptsFormControls = computedFormControls(this.promptsFormArray);
}
