import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-ai-credential-button',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './ai-credential-button.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiCredentialButtonComponent {}
