import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  input,
  signal,
} from '@angular/core';
import { Prompt } from '@core/datatypes';
import { JsonPipe } from '@angular/common';
import { CompletionsService } from '../../services';
import {
  HttpDownloadProgressEvent,
  HttpEvent,
  HttpEventType,
} from '@angular/common/http';

@Component({
  selector: 'app-template-completion',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './template-completion.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateCompletionComponent implements OnInit {
  readonly #completionsService = inject(CompletionsService);
  prompt = input.required<Prompt>();
  completion = signal<string>('');

  ngOnInit(): void {
    this.#completionsService
      .getCompletion(this.prompt())
      // .subscribe({
      //   next: (data) => {
      //     console.log(data);
      //   },
      // });
      .subscribe((event: HttpEvent<unknown>) => {
        if (event.type === HttpEventType.Sent) {
          console.log('Start!', event);
          return;
        }
        if (event.type === HttpEventType.UploadProgress) {
          console.log(
            'Uploaded ' + event.loaded + ' out of ' + event.total + ' bytes'
          );
          return;
        }
        if (event.type === HttpEventType.ResponseHeader) {
          console.log('Response header received: ' + event.headers);
          return;
        }
        if (event.type === HttpEventType.DownloadProgress) {
          console.log(
            'Downloaded ' + event.loaded + ' out of ' + event.total + ' bytes',
            event
          );
          const progressEvent = event as HttpDownloadProgressEvent;
          this.#onPartialText(progressEvent.partialText || '');
          return;
        }
        if (event.type === HttpEventType.Response) {
          console.log('Finished!', event);
          return;
        }
        if (event.type === HttpEventType.User) {
          console.log('User event: ' + event);
          return;
        }
        console.log('Unknown event type: ' + event);
      });
  }

  #onPartialText(partialText: string): void {
    this.completion.set(partialText);
  }
}
