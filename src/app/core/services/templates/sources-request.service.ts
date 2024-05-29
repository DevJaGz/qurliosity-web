import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CreatePDFSource, ListSources, Source, Sources } from '@core/datatypes';
import { handleErrorPipeUtil } from '@core/utils';
import { environment } from '@env';
import { queryMapUtil } from '@shared/utils';
import { Observable } from 'rxjs';

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

  createPDFSource(data: CreatePDFSource): Observable<Source> {
    const formData = new FormData();
    formData.append('file', data.file);
    formData.append(
      'embedderCredential',
      JSON.stringify(data.embedderCredential)
    );

    return this.#http
      .post<Source>(
        `${environment.API_URL}/templates/${data._templateId}/sources/pdf`,
        formData
      )
      .pipe(
        handleErrorPipeUtil({
          userMessage: 'Sorry, there was an error creating the source',
        })
      );
  }
}
