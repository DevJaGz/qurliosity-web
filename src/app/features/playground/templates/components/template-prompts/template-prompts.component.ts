import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { TemplatePromptComponent } from '../template-prompt/template-prompt.component';
import { SharedModule } from '@shared/shared.module';
import { MenuItem } from 'primeng/api';
import { NgClass } from '@angular/common';
import { PromptsService } from '../../services';
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-template-prompts',
  standalone: true,
  imports: [NgClass, SharedModule, TemplatePromptComponent, JsonPipe],
  templateUrl: './template-prompts.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplatePromptsComponent {
  readonly #promptsService = inject(PromptsService);
  readonly promptsFormControls = this.#promptsService.promptsFormControls;

  buttons: MenuItem[] = [
    {
      tooltipOptions: {
        tooltipLabel: 'Add Prompt',
        tooltipPosition: 'left',
      },
      icon: 'message',
      styleClass: 'text-cyan-400',
      id: 'prompt',
    },
    {
      tooltipOptions: {
        tooltipLabel: 'Add Variable',
        tooltipPosition: 'left',
      },
      icon: 'variable-plus',
      styleClass: 'text-fuchsia-400',
      id: 'var',
    },
  ];

  isShownButtons = signal(true);

  add(id: 'prompt' | 'var') {
    if (id === 'prompt') {
      this.#promptsService.addPrompt();
    }
  }
}
