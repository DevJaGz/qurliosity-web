import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AICredentials, Prompt } from '@core/datatypes';
import { environment } from '@env';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompletionsRequestService {
  readonly #http = inject(HttpClient);

  getCompletion(
    templateId: string,
    prompt: Prompt,
    AICredentials: AICredentials
  ): Observable<HttpEvent<string>> {
    const embedderCredential = AICredentials.embedderCredential;
    const LLMCredential = AICredentials.LLMCredential;
    const hasCredential = Boolean(embedderCredential && LLMCredential);

    if (!hasCredential) {
      throw new Error('No credentials provided for completion');
    }

    const body = {
      prompt,
      LLMCredential,
      embedderCredential,
    };

    return this.#http.post(
      `${environment.API_URL}/templates/${templateId}/completion`,
      body,
      {
        reportProgress: true,
        observe: 'events',
        responseType: 'text',
      }
    );
  }
}
