import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Prompt } from '@core/datatypes';
import { handleErrorPipeUtil } from '@core/utils';
import { environment } from '@env';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PromptsRequestService {
  readonly #http = inject(HttpClient);

  createPrompt(data: Prompt): Observable<Prompt> {
    return this.#http
      .post<Prompt>(
        `${environment.API_URL}/templates/${data._templateId}/prompts`,
        data
      )
      .pipe(
        handleErrorPipeUtil({
          userMessage: 'Sorry, there was an error creating the prompt',
        })
      );
  }

  deletePrompt(prompt: Prompt): Observable<Prompt> {
    return this.#http
      .delete<Prompt>(
        `${environment.API_URL}/templates/${prompt._templateId}/prompts/${prompt._id}`
      )
      .pipe(
        handleErrorPipeUtil({
          userMessage: 'Sorry, there was an error deleting the prompt',
        })
      );
  }
}
