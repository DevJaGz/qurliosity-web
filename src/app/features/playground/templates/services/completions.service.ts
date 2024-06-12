import { Injectable, computed, inject } from '@angular/core';
import { TemplateFormService } from './template-form.service';
import { toSignalFormArray } from '@shared/utils';
import { Prompt, Prompts } from '@core/datatypes';
import { CompletionsRequestService } from '@core/services';
import { AiCredentialsService } from '@shared/services';
import { BehaviorSubject, Observable, of, take } from 'rxjs';
import {
  HttpDownloadProgressEvent,
  HttpEvent,
  HttpEventType,
  HttpHeaderResponse,
} from '@angular/common/http';
import { CompletionsStateService } from '../states';
import { CompletionStream } from '../datatypes';

@Injectable()
export class CompletionsService {
  readonly #templateFormService = inject(TemplateFormService);
  readonly #aiCredentialsService = inject(AiCredentialsService);
  readonly #completionsRequestService = inject(CompletionsRequestService);
  readonly #completionsStateService = inject(CompletionsStateService);
  readonly templateId = this.#templateFormService.templateId;
  readonly promptFormArray = toSignalFormArray(
    this.#templateFormService.promptFormArray
  );
  readonly prompts = computed(() => {
    const prompts = this.promptFormArray().value as Prompts;
    return prompts.filter((prompt) => Boolean(prompt._id && prompt.value));
  });

  getCompletion(prompt: Prompt): Observable<CompletionStream> {
    const promptId = prompt._id;
    if (!promptId) {
      throw new Error('Prompt id is required for getting the completion');
    }

    const promptFound = this.#completionsStateService.getPrompt(promptId);

    if (promptFound?.value === prompt.value) {
      const completion = this.#completionsStateService.getCompletion(promptId);
      const completionStream: CompletionStream = {
        status: 'finished',
        partialText: completion,
      };
      return of(completionStream);
    }

    this.#completionsStateService.setPrompt(prompt);
    const newCompletionStream = new BehaviorSubject<CompletionStream>({
      status: 'idle',
      partialText: '',
    });

    this.#completionsRequestService
      .getCompletion(
        this.templateId,
        prompt,
        this.#aiCredentialsService.AICredentials()
      )
      .subscribe({
        next: (event) =>
          this.#handleCompletionEvent(event, promptId, newCompletionStream),
        error: () => {
          newCompletionStream.complete();
        },
        complete: () => {
          newCompletionStream.complete();
        },
      });

    return newCompletionStream.asObservable();
  }

  #handleCompletionEvent(
    event: HttpEvent<string>,
    promptId: string,
    completionStream: BehaviorSubject<CompletionStream>
  ) {
    const currentCompletionStream = completionStream.getValue();
    let partialText = currentCompletionStream.partialText;
    let status = currentCompletionStream.status;

    if (event.type === HttpEventType.Sent) {
      status = 'start';
    } else if (event.type === HttpEventType.ResponseHeader) {
      const response = event as HttpHeaderResponse;
      if (response.status !== 200) {
        status = 'error';
        partialText = '';
        completionStream.next({ status, partialText });
        completionStream.complete();
        throw new Error('Error getting completion event');
      }
      status = 'streaming';
    } else if (event.type === HttpEventType.DownloadProgress) {
      const progress = event as HttpDownloadProgressEvent;
      status = 'streaming';
      partialText = progress.partialText || '';
    } else if (event.type === HttpEventType.Response) {
      status = 'finished';
    }

    completionStream.next({ status, partialText });
    this.#completionsStateService.setCompletion(promptId, partialText);
  }
}
