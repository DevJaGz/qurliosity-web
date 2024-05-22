import { Injectable, inject } from '@angular/core';
import { SourcesRequestService, TemplatesRequestService } from '@core/services';
import { Observable, forkJoin, map } from 'rxjs';

import { handleErrorPipeUtil } from '@core/utils';
import { TemplateState } from '../datatypes';
import { TemplateFormService } from './template-form.service';
import { FormGroup } from '@angular/forms';

@Injectable()
export class TemplateService {
  readonly #templatesRequestService = inject(TemplatesRequestService);
  readonly #sourcesRequestService = inject(SourcesRequestService);
  readonly #formService = inject(TemplateFormService);

  getTemplate(templateId: string): Observable<TemplateState> {
    return forkJoin({
      template: this.#templatesRequestService.getTemplate(templateId),
      sources: this.#sourcesRequestService.listSources({
        _templateId: templateId,
      }),
    }).pipe(
      map(({ template }) => {
        return {
          ...template,
          sources: [],
        };
      }),
      handleErrorPipeUtil({
        userMessage:
          'Sorry, there was an error loading the template and its resources',
      })
    );
  }

  createFormTemplate(template: TemplateState): FormGroup {
    return this.#formService.createTemplateForm(template);
  }
}
