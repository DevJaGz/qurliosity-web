import { Injectable, inject } from '@angular/core';
import { TemplatesRequestService } from '@core/services';
import { Observable, forkJoin, map } from 'rxjs';
import { TemplateState } from '../datatypes';

@Injectable()
export class TemplateService {
  readonly #templatesRequestService = inject(TemplatesRequestService);

  getTemplate(templateId: string): Observable<TemplateState> {
    return forkJoin({
      template: this.#templatesRequestService.getTemplate(templateId),
    }).pipe(
      map(({ template }) => {
        return {
          ...template,
          sources: [],
        };
      })
    );
  }
}
