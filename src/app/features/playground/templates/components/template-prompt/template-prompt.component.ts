import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
} from '@angular/core';
import { Prompt } from '@core/datatypes';
import { SharedModule } from '@shared/shared.module';
import { PromptsService } from '../../services';

@Component({
  selector: 'app-template-prompt',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './template-prompt.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplatePromptComponent {
  readonly #promptsService = inject(PromptsService);
  prompt = input.required<Prompt>();
  showDeleteDialog = signal(false);

  deletePrompt() {
    this.showDeleteDialog.set(false);
    this.#promptsService.deletePrompt(this.prompt());
  }
}
