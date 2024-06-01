import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { TemplatePromptVarComponent } from '../template-prompt-var/template-prompt-var.component';

@Component({
  selector: 'app-template-prompt-vars',
  standalone: true,
  imports: [SharedModule, TemplatePromptVarComponent],
  templateUrl: './template-prompt-vars.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplatePromptVarsComponent {}
