import { HttpClient, HttpEvent } from '@angular/common/http';
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

    return this.#http.post(
      `${environment.API_URL}/templates/${templateId}/completion`,
      {
        prompt,
        LLMCredential,
        embedderCredential,
      },
      {
        reportProgress: true,
        observe: 'events',
        responseType: 'text',
      }
    );
  }
}
