import { Injectable, inject } from '@angular/core';
import { SourcesRequestService, TemplatesRequestService } from '@core/services';
import { Observable, forkJoin, map } from 'rxjs';

import { handleErrorPipeUtil } from '@core/utils';
import { TemplateState } from '../datatypes';
import { TemplateFormService } from './template-form.service';
import { SourceType } from '@core/enums';

@Injectable()
export class TemplateService {
  readonly #templatesRequestService = inject(TemplatesRequestService);
  readonly #sourcesRequestService = inject(SourcesRequestService);
  readonly #templateFormService = inject(TemplateFormService);

  templateForm = this.#templateFormService.form;
  sourceForms = this.#templateFormService.sourceForms;

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
          sources: [
            {
              _id: '1',
              __v: 0,
              value: 'Source 1',
              type: SourceType.PDF,
              _templateId: '6644ffa6065e545f87808399',
              _storageRecordId: '2',
            },
          ],
        } as TemplateState;
      }),
      handleErrorPipeUtil({
        userMessage:
          'Sorry, there was an error loading the template and its resources',
      })
    );
  }

  intializeForm(template: TemplateState): void {
    this.#templateFormService.initializeForm(template);
  }
}
