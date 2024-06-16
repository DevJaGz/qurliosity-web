import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { TemplatePromptComponent } from '../template-prompt/template-prompt.component';
import { SharedModule } from '@shared/shared.module';
import { MenuItem } from 'primeng/api';
import { NgClass } from '@angular/common';
import { PromptsService } from '../../services';
import { EmptyStateComponent } from '@shared/components';

@Component({
  selector: 'app-template-prompts',
  standalone: true,
  imports: [
    NgClass,
    SharedModule,
    TemplatePromptComponent,
    EmptyStateComponent,
  ],
  templateUrl: './template-prompts.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplatePromptsComponent {
  readonly #promptsService = inject(PromptsService);
  readonly promptsFormArray = this.#promptsService.promptsFormArray;
  readonly promptsFormControls = this.#promptsService.promptsFormControls;
  readonly hasPrompts = computed(() => this.promptsFormControls().length > 0);

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
        tooltipLabel: 'Add Variable (Soon)',
        tooltipPosition: 'left',
      },
      icon: 'variable-plus',
      styleClass: 'text-fuchsia-400',
      id: 'var',
      disabled: true,
    },
  ];

  isShownButtons = signal(true);

  add(id: 'prompt' | 'var') {
    if (id === 'prompt') {
      this.#promptsService.addPrompt();
    }
  }
}
