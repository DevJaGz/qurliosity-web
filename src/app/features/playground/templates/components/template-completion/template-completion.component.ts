import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { Prompt } from '@core/datatypes';
import { CompletionsService } from '../../services';
import { CompletionStream, CompletionStreamStatus } from '../../datatypes';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-template-completion',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './template-completion.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateCompletionComponent implements OnInit {
  readonly #completionsService = inject(CompletionsService);
  readonly #completionStream = signal<CompletionStream>({
    status: 'idle',
    partialText: '',
  });

  prompt = input.required<Prompt>();
  completion = computed(() => this.#completionStream().partialText);
  completionStatus = computed(() => this.#completionStream().status);
  hasErrors = computed(() => {
    const status = this.completionStatus();
    return status === 'error';
  });
  isLoading = computed(() => {
    const status = this.completionStatus();
    if (status === 'error') {
      return false;
    }
    const hasStreaming = Boolean(
      status === 'streaming' || status === 'finished'
    );
    return !hasStreaming;
  });

  ngOnInit(): void {
    this.#completionsService.getCompletion(this.prompt()).subscribe({
      next: (stream) => this.#completionStream.set(stream),
    });
  }
}
