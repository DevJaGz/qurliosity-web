import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-template-prompt',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './template-prompt.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplatePromptComponent {}
