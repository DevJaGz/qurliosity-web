import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-template-prompt-var',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './template-prompt-var.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplatePromptVarComponent {}
