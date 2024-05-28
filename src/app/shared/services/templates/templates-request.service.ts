import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  QueryTemplate,
  Template,
  TemplateWithResources,
  Templates,
} from '@core/datatypes';
import { handleErrorPipeUtil } from '@core/utils';
import { environment } from '@env';
import { queryMapUtil } from '@shared/utils';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TemplatesRequestService {
  readonly #http = inject(HttpClient);

  listTemplates(query: QueryTemplate = {}): Observable<Templates> {
    const fromObject = queryMapUtil(query, {
      isActive: 'active',
      isDemo: 'demo',
    });

    const options = {
      params: new HttpParams({ fromObject }),
    };

    return this.#http
      .get<Templates>(`${environment.API_URL}/templates/`, options)
      .pipe(
        handleErrorPipeUtil({
          userMessage: 'Sorry, there was an error loading the templates',
        })
      );
  }

  getTemplate(templateId: string): Observable<Template> {
    return this.#http
      .get<Template>(`${environment.API_URL}/templates/${templateId}`)
      .pipe(
        handleErrorPipeUtil({
          userMessage: 'Sorry, there was an error loading the template',
        })
      );
  }

  getTemplateWithResources(
    templateId: string
  ): Observable<TemplateWithResources> {
    return this.#http
      .get<TemplateWithResources>(
        `${environment.API_URL}/templates/${templateId}/resources`
      )
      .pipe(
        handleErrorPipeUtil({
          userMessage:
            'Sorry, there was an error loading the template and its resources',
        })
      );
  }
}
