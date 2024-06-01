import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TemplatePromptComponent } from '../template-prompt/template-prompt.component';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-template-prompts',
  standalone: true,
  imports: [SharedModule, TemplatePromptComponent],
  templateUrl: './template-prompts.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplatePromptsComponent {
  addPrompt() {
    console.log('add prompt');
  }
}
