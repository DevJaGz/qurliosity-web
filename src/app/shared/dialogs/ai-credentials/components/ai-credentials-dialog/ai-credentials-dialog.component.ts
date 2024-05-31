import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-ai-credentials-dialog',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './ai-credentials-dialog.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiCredentialsDialogComponent {}
