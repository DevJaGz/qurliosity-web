import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CompletionsService } from '../../services';
import { TemplateCompletionComponent } from '../template-completion/template-completion.component';

@Component({
  selector: 'app-template-completions',
  standalone: true,
  imports: [TemplateCompletionComponent],
  templateUrl: './template-completions.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateCompletionsComponent {
  readonly #completionsService = inject(CompletionsService);
  readonly prompts = this.#completionsService.prompts;
}
