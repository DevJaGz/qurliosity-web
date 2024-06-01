import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-template-prompt-vars',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './template-prompt-vars.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplatePromptVarsComponent {}
