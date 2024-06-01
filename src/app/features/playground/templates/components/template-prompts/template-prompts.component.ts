import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { TemplatePromptComponent } from '../template-prompt/template-prompt.component';
import { SharedModule } from '@shared/shared.module';
import { TemplatePromptVarsComponent } from '../template-prompt-vars/template-prompt-vars.component';
import { MenuItem } from 'primeng/api';
import { NgClass } from '@angular/common';
import { PromptsService } from '../../services';

@Component({
  selector: 'app-template-prompts',
  standalone: true,
  imports: [NgClass, SharedModule, TemplatePromptComponent],
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
      icon: 'variable',
      styleClass: 'text-fuchsia-400',
      id: 'var',
    },
  ];

  isShownButtons = signal(true);

  add(id: 'prompt' | 'var') {
    console.log(id);
  }
}
