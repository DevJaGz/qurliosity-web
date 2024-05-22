import { Injectable, inject } from '@angular/core';
import { SourcesRequestService, TemplatesRequestService } from '@core/services';
import { Observable, forkJoin, map } from 'rxjs';

import { TemplateStateService } from './template-state.service';
import { handleErrorPipeUtil } from '@core/utils';
import { TemplateState } from '../datatypes';

@Injectable()
export class TemplateService {
  readonly #templatesRequestService = inject(TemplatesRequestService);
  readonly #sourcesRequestService = inject(SourcesRequestService);
  readonly #state = inject(TemplateStateService);

  template$ = this.#state.state$;

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
}
