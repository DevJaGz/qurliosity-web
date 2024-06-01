import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TemplatePromptComponent } from '../template-prompt/template-prompt.component';
import { SharedModule } from '@shared/shared.module';
import { TemplatePromptVarsComponent } from '../template-prompt-vars/template-prompt-vars.component';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-template-prompts',
  standalone: true,
  imports: [SharedModule, TemplatePromptComponent, TemplatePromptVarsComponent],
  templateUrl: './template-prompts.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplatePromptsComponent {
  add(id: 'prompt' | 'var') {
    console.log(id);
  }

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
}
