import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  input,
  signal,
} from '@angular/core';
import { Prompt } from '@core/datatypes';
import { CompletionsService } from '../../services';
import { CompletionStream } from '../../datatypes';

@Component({
  selector: 'app-template-completion',
  standalone: true,
  imports: [],
  templateUrl: './template-completion.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateCompletionComponent implements OnInit {
  readonly #completionsService = inject(CompletionsService);
  prompt = input.required<Prompt>();
  completion = signal<string>('');
  isLoading = signal<boolean>(true);

  ngOnInit(): void {
    this.#completionsService.getCompletion(this.prompt()).subscribe({
      next: (stream) => this.#onCompletionStream(stream),
    });
  }

  #onCompletionStream(stream: CompletionStream): void {
    const { status, partialText } = stream;
    this.completion.set(partialText);
    const hasStreaming = Boolean(
      status === 'streaming' || status === 'finished'
    );
    this.isLoading.set(!hasStreaming);
  }
}
