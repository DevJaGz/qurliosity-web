import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ListSources, Sources } from '@core/datatypes';
import { handleErrorPipeUtil } from '@core/utils';
import { environment } from '@env';
import { queryMapUtil } from '@shared/utils';
import { Observable, startWith, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SourcesRequestService {
  readonly #http = inject(HttpClient);

  listSources(data: ListSources): Observable<Sources> {
    const { _templateId, ...query } = data;

    const fromObject = queryMapUtil(query, {});

    const options = {
      params: new HttpParams({ fromObject }),
    };

    return this.#http
      .get<Sources>(
        `${environment.API_URL}/templates/${_templateId}/sources`,
        options
      )
      .pipe(
        handleErrorPipeUtil({
          userMessage: 'Sorry, there was an error loading the sources',
        })
      );
  }
}
